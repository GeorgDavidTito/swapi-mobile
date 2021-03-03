import React, { useEffect, useState, useCallback } from 'react';
import { SafeAreaView, Text, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { getPilots } from '../../../redux/pilots/actions';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
import styles from './styles';

const Pilots = (props) => {
  const [feed, setFeed] = useState([]);
  const [page, setPage] = useState(1);
  const [viewable, setViewable] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { pilots, next } = useSelector((state) => state?.pilots);

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.pilotsContainer}>
        <Text style={styles.shipContent}>{item.name}</Text>
      </TouchableOpacity>
    );
  };

  const  loadPage = async (pageNumber = page, shouldRefresh = false) => {
    if (loading) {
      return;
    }
    setLoading(true);
    const pageGlobal = next?.split('=');

    if (pageNumber < Number(pageGlobal?.[1]) && !shouldRefresh) {
      await dispatch(getPilots(`?page=${pageGlobal?.[1]}`));
    } else {
      const data = pilots?.slice(pageNumber * 10, pageNumber * 10 + 10);
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
    if (pilots?.length === 0) {
      dispatch(getPilots());
    }
  }, []);

  useEffect(() => {
    if (pilots?.length > 0) {
      setFeed(pilots);
    }
  }, [pilots]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <FlatList
          key="pilots"
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
      </SafeAreaView>
    </>
  );
};

export default Pilots;
