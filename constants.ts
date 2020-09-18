import { Dimensions } from "react-native";

export const { width, height } = Dimensions.get("window");

export const SPACING = 10;
export const ITEM_SIZE = width * 0.72;
export const FAKE_ITEM_SPACE = (width - ITEM_SIZE) / 2;
export const BACKDROP_HEIGHT = height * 0.6;
