import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { getShips } from '../../../redux/ships/actions';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
import mainImage from '../../../assets/shipsBackground.jpg';
import styles from './styles';

const Ships = (props) => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [viewable, setViewable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { ships, next } = useSelector((state) => state?.ships);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.shipContainer}
        onPress={() => props.navigation.navigate('Ship', { item })}>
        <Text style={styles.shipContent}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const loadPage = async (pageNumber = page, shouldRefresh = false) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const pageGlobal = next?.split('=');

    if (pageNumber < Number(pageGlobal?.[1]) && !shouldRefresh) {
      await dispatch(getShips(`?page=${pageGlobal?.[1]}`));
    } else {
      const data = ships?.slice(pageNumber * 10, pageNumber * 10 + 10);
      setFeed((feed) => (shouldRefresh ? data : [...feed, ...data]));
    }
    setPage((page) => page + 1);

    setLoading(false);
  };

  const refreshList = () => {
    setRefreshing(true);
    setPage(0);
    setFeed([]);
    loadPage(0, true);
    setRefreshing(false);
  };
  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  useEffect(() => {
    if (ships?.length === 0) {
      dispatch(getShips());
    }
  }, []);

  useEffect(() => {
    if (ships?.length > 0) {
      setFeed(ships);
    }
  }, [ships]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <ImageBackground source={mainImage} style={styles.image}>
          <FlatList
            key="ships"
            data={feed}
            keyExtractor={(item) => item?.name?.toString()}
            renderItem={renderItem}
            // onViewableItemsChanged={handleViewableChanged}
            viewabilityConfig={{
              viewAreaCoveragePercentThreshold: 15,
            }}
            showsVerticalScrollIndicator={false}
            onRefresh={refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.5}
            onEndReached={() => loadPage()}
            ListFooterComponent={loading && <Loading />}
            initialNumToRender={5}
            maxToRenderPerBatch={2}
          />
        </ImageBackground>
      </SafeAreaView>
    </>
  );
};

export default Ships;
