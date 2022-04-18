import React from 'react';

import { useAuth } from '@/services/authentication';
import { useGetPostList } from '@/services/post';
import PostBox from '@/templates/components/post-box';
import { Fab, RangeSlider, Spinner } from '@components';
import { useBottomReached, useDebounce } from '@hooks';
import { Meta } from '@layout';
import { Main, Post as UIPost } from '@templates';

const Post = React.memo(UIPost);

const Index = () => {
  const [showPost, setShowPost] = React.useState<boolean>(false);
  const [distance, setDistance] = React.useState<number>(5);
  const [latitude, setLatitude] = React.useState<number>();
  const [longitude, setLongitude] = React.useState<number>();
  const [maxPrice, setMaxPrice] = React.useState<number>(5000000);
  const [minPrice, setMinPrice] = React.useState<number>(0);
  const [floorArea, setFloorArea] = React.useState<number>();

  const listRef = React.useRef<HTMLDivElement>(null);

  const dbMaxPrice = useDebounce(maxPrice, 500);
  const dbMinPrice = useDebounce(minPrice, 500);
  const dbFloorArea = useDebounce(floorArea, 500);
  const dbDistance = useDebounce(distance, 500);

  const { data: auth } = useAuth();
  const { data, isLoading, fetchNextPage } = useGetPostList({
    distance: dbDistance,
    latitude,
    longitude,
    maxPrice: dbMaxPrice,
    minPrice: dbMinPrice,
    floorArea: dbFloorArea,
  });

  const { onScroll } = useBottomReached({
    onBottomReach: async () => {
      await fetchNextPage();
    },
    ref: listRef,
  });
  const handleChangePrice = React.useCallback(
    (maximum: number, minimum: number) => {
      setMinPrice(minimum);
      setMaxPrice(maximum);
    },
    []
  );

  const handleChangeFloorArea = React.useCallback((maximum: number) => {
    setFloorArea(maximum);
  }, []);

  const handleChangeDistance = React.useCallback((maximum: number) => {
    setDistance(maximum);
  }, []);

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const { coords } = position;
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    });
  }, []);

  const renderFilter = () => (
    <div className="flex flex-col gap-2 rounded-lg bg-gray-200 px-3 py-1 dark:bg-gray-700">
      <p className="">Filters</p>
      <div className="flex flex-col gap-2">
        <p className="text-sm">Price (VND)</p>
        <RangeSlider
          initialMin={0}
          initialMax={5000000}
          minimum={0}
          maximum={10000000}
          step={1000}
          showMin
          onValueChange={handleChangePrice}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm">Floor Area (m2)</p>
        <RangeSlider
          initialMax={500}
          maximum={1000}
          onValueChange={handleChangeFloorArea}
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm">Distance from your location (km)</p>
        <RangeSlider
          initialMax={5}
          maximum={100}
          onValueChange={handleChangeDistance}
        />
      </div>
    </div>
  );

  return (
    <Main meta={<Meta title="4Rent" description="" />}>
      <div className="grid grid-cols-9 gap-3">
        <div className="col-span-8 block lg:hidden">{renderFilter()}</div>
        <div
          ref={listRef}
          onScroll={onScroll}
          className="col-span-8 flex min-h-screen max-w-2xl flex-col items-center justify-center gap-10 lg:col-span-7 xl:col-span-6"
        >
          <PostBox
            activeUser={auth}
            isShow={showPost}
            onBackdropClick={() => setShowPost(false)}
            onPosted={() => setShowPost(false)}
          />
          {data && !data.pages[0]?.data?.empty ? (
            data.pages.map((page) => {
              const { data: posts } = page;
              return posts
                ? posts.content.map((item) => (
                    <Post key={item.id} {...item} currentUser={auth} />
                  ))
                : undefined;
            })
          ) : (
            <p className="h-screen min-w-[42rem] text-center">
              Wow! Such empty.
            </p>
          )}
          {isLoading ? (
            <div className="">
              <Spinner />
            </div>
          ) : null}
        </div>
        <div className="col-span-2 hidden lg:block xl:col-span-3">
          {renderFilter()}
        </div>
      </div>
      <Fab onClick={() => setShowPost(true)} />
    </Main>
  );
};

export default Index;
