import AvatarItem from "@/components/AvatarItem";
import FixedBottomCTA from "@/components/FixedBottomCTA";
import Tab from "@/components/Tab";
import { colors } from "@/constants";
import useAuth from "@/hooks/queries/useAuth";
import useGetAvatarItems from "@/hooks/queries/useGetAvatarItems";
import { router, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { FlatList, Platform, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";
import Toast from "react-native-toast-message";
import { SvgUri } from "react-native-svg";
import { baseUrls } from "@/api/axios";

export default function AvatarScreen() {
  const navigation = useNavigation();
  const { hats, faces, tops, bottoms, hands, skins } = useGetAvatarItems();
  const [currentTab, setCurrentTab] = useState(0);
  const pagerRef = useRef<PagerView | null>(null);
  const { auth, editProfileMutation } = useAuth();
  const [avatarItem, setAvatarItem] = useState({
    hatId: auth?.hatId ?? "",
    faceId: auth?.faceId ?? "",
    topId: auth?.topId ?? "",
    bottomId: auth?.bottomId ?? "",
    handId: auth?.handId ?? "",
    skinId: auth?.skinId ?? "01",
  });

  const getImageId = (url: string) => {
    const filename = url.split("/").pop() ?? "";
    const [id] = filename.split(".");
    return id;
  };

  const handlePressItem = (name: string, item: string) => {
    setAvatarItem((prev) => ({ ...prev, [name]: getImageId(item) }));
  };

  const handlePressTab = (index: number) => {
    pagerRef.current?.setPage(index);
    setCurrentTab(index);
  };

  const handleSaveAvatar = () => {
    editProfileMutation.mutate(avatarItem, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: "아바타가 저장되었습니다.",
          position: "top",
        });
        router.back();
      },
    });
  };

  const getAvatarItemUrl = (category: string, id?: string) => {
    const baseUrl = Platform.OS === "ios" ? baseUrls.ios : baseUrls.android;
    if (category === "default" || !id) {
      return `${baseUrl}/default/frame.svg`;
    }
    return `${baseUrl}/items/${category}/${id}.svg`;
  };

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: colors.ORANGE_200,
      },
    });
  }, [navigation]);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.avatarContainer}>
            {avatarItem.hatId && (
              <SvgUri
                uri={getAvatarItemUrl("hats", avatarItem.hatId)}
                style={[styles.avatar, { zIndex: 70 }]}
              />
            )}
            {avatarItem.faceId && (
              <SvgUri
                uri={getAvatarItemUrl("faces", avatarItem.faceId)}
                style={[styles.avatar, { zIndex: 60 }]}
              />
            )}
            {avatarItem.topId && (
              <SvgUri
                uri={getAvatarItemUrl("tops", avatarItem.topId)}
                style={[styles.avatar, { zIndex: 50 }]}
              />
            )}
            {avatarItem.bottomId && (
              <SvgUri
                uri={getAvatarItemUrl("bottoms", avatarItem.bottomId)}
                style={[styles.avatar, { zIndex: 40 }]}
              />
            )}
            <SvgUri
              uri={getAvatarItemUrl("default")}
              style={[styles.avatar, { zIndex: 30 }]}
            />
            {avatarItem.skinId && (
              <SvgUri
                uri={getAvatarItemUrl("skins", avatarItem.skinId)}
                style={[styles.avatar, { zIndex: 20 }]}
              />
            )}
            {avatarItem.handId && (
              <SvgUri
                uri={getAvatarItemUrl("hands", avatarItem.handId)}
                style={[styles.avatar, { zIndex: 10 }]}
              />
            )}
          </View>
        </View>
        <View style={styles.tabContainer}>
          {["모자", "얼굴", "상의", "하의", "손", "피부색"].map(
            (label, index) => (
              <Tab
                key={index}
                isActive={index === currentTab}
                onPress={() => handlePressTab(index)}
              >
                {label}
              </Tab>
            )
          )}
        </View>
        <PagerView
          ref={pagerRef}
          style={styles.pagerView}
          initialPage={0}
          onPageSelected={(e) => setCurrentTab(e.nativeEvent.position)}
        >
          {/* {[
            { data: hats, name: "hatId", id: avatarItem.hatId },
            { data: faces, name: "faceId", id: avatarItem.faceId },
            { data: tops, name: "topId", id: avatarItem.topId },
            { data: bottoms, name: "bottomId", id: avatarItem.bottomId },
            { data: hands, name: "handId", id: avatarItem.handId },
            { data: skins, name: "skinId", id: avatarItem.skinId },
          ].map((list) => (
            // eslint-disable-next-line react/jsx-key
            <FlatList
              data={list.data}
              keyExtractor={(item, index) => String(index)}
              numColumns={3}
              contentContainerStyle={styles.listContainer}
              renderItem={({ item }) => (
                <AvatarItem
                  uri={item}
                  isSelected={getImageId(item) === list.id}
                  onPress={() => handlePressItem(list.name, item)}
                />
              )}
            />
          ))} */}
          <FlatList
            data={hats}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.hatId}
                onPress={() => handlePressItem("hatId", item)}
              />
            )}
          />
          <FlatList
            data={faces}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.faceId}
                onPress={() => handlePressItem("faceId", item)}
              />
            )}
          />
          <FlatList
            data={tops}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.topId}
                onPress={() => handlePressItem("topId", item)}
              />
            )}
          />
          <FlatList
            data={bottoms}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.bottomId}
                onPress={() => handlePressItem("bottomId", item)}
              />
            )}
          />
          <FlatList
            data={hands}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.handId}
                onPress={() => handlePressItem("handId", item)}
              />
            )}
          />
          <FlatList
            data={skins}
            keyExtractor={(item, index) => String(index)}
            numColumns={3}
            contentContainerStyle={styles.listContainer}
            renderItem={({ item }) => (
              <AvatarItem
                uri={item}
                isSelected={getImageId(item) === avatarItem.skinId}
                onPress={() => handlePressItem("skinId", item)}
              />
            )}
          />
        </PagerView>
      </View>

      <FixedBottomCTA label="저장" onPress={handleSaveAvatar} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: "center",
    position: "relative",
    backgroundColor: colors.ORANGE_200,
    width: "100%",
    height: 115,
    marginBottom: 115,
  },
  avatarContainer: {
    width: 229,
    height: 229,
    borderRadius: 229,
    borderWidth: 1,
    backgroundColor: colors.WHITE,
    borderColor: colors.GRAY_200,
    overflow: "hidden",
  },
  avatar: {
    width: 229,
    height: 229,
    position: "absolute",
  },
  tabContainer: {
    flexDirection: "row",
  },
  pagerView: {
    flex: 1,
  },
  listContainer: {
    paddingBottom: 120,
    marginTop: 10,
    alignItems: "center",
  },
});
