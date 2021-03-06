import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput,
  View,
} from 'react-native';
import { getFilms, getSearch, resetFilms } from '../../../redux/films/actions';
import { getShips } from '../../../redux/ships/actions';
import { getPilots } from '../../../redux/pilots/actions';
import { useSelector, useDispatch } from 'react-redux';
import Loading from '../../components/Loading';
import styles from './styles';

const Films = (props) => {
  const [feed, setFeed] = useState([]);
  const [searchText, setSearchText] = useState('');

  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const { films, next } = useSelector((state) => state?.films);
  const { pilots } = useSelector((state) => state?.pilots);
  const { ships } = useSelector((state) => state?.ships);

  const searchFilter = () => {
    if (searchText === '') {
      dispatch(resetFilms());
    } else {
      dispatch(getSearch(`?search=${searchText}`));
    }
  };

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity style={styles.filmContainer}>
        <Text style={styles.filmContent}>{item?.title}</Text>
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
      await dispatch(getFilms(`?page=${pageGlobal?.[1]}`));
    } else {
      const data = films?.slice(pageNumber * 10, pageNumber * 10 + 10);
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

  useEffect(() => {
    if (films?.length === 0) {
      dispatch(getFilms());
    }
    if (pilots?.length === 0) {
      dispatch(getPilots());
    }
    if (ships?.length === 0) {
      dispatch(getShips());
    }
  }, []);

  useEffect(() => {
    if (films?.length >= 0) {
      setFeed(films);
    }
  }, [films]);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.searchInputContainer}>
          <TextInput
            placeholder="Recomendacion por piloto o nave"
            style={styles.searchInput}
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
            autoCorrect={false}
          />
          <TouchableOpacity
            style={styles.searchContainer}
            onPress={() => searchFilter()}>
            <Text style={styles.searchContent}>Buscar</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          key="films"
          data={feed}
          keyExtractor={(item) =>
            `${item?.episode_id?.toString()} ${item?.title}`
          }
          renderItem={renderItem}
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

export default Films;
