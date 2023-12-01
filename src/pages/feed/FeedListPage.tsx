import { findAllFeed } from '@/apis/feed/feedApi';
import { Layout, Title } from '@/components';
import ListCard from '@/features/feed/List/ListCard';
import { auth } from '@/service/firebase';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { generatePath, useNavigate } from 'react-router';
import styled from 'styled-components';

const FeedListPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const getFeeds = async () => {
    const { data } = await findAllFeed();
    return data;
  };

  const { data: feeds } = useQuery({
    queryKey: ['fetchFeeds', isLoggedIn],
    queryFn: () => getFeeds(),
    enabled: isLoggedIn,
  });

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });
  }, []);

  return (
    <Layout>
      <Box>
        <Title title="피드" />
        <CardContainer>
          {feeds?.map((feed) => {
            const hasImg = feed.photos.length ? true : false;

            return (
              <ListCard
                key={feed._id}
                data={feed}
                hasImg={hasImg}
                onClick={() => {
                  const path = generatePath('/feed/:id', {
                    id: feed._id,
                  });
                  navigate(path);
                }}
              />
            );
          })}
        </CardContainer>
      </Box>
    </Layout>
  );
};

export default FeedListPage;

const Box = styled.div`
  height: 100vh;
  padding: 48px 0;
  margin: 0 auto;
`;

const CardContainer = styled.div`
  padding: 48px;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 16px;

  @media (max-width: 576px) {
    padding: 16px;
    grid-template-columns: repeat(auto-fill, minmax(100px, 3fr));
  }
`;
