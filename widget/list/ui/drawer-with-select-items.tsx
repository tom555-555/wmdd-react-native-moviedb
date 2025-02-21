import React from "react";
import { View } from "react-native";
import { Label, RadioGroup, RadioGroupItem } from "~/components/ui";
import { BottomDrawer } from "~/shared/ui";

type DrawerWithSelectItemsProps = {
  isOpen: boolean;
  onClose: () => void;
  currentItem: string;
  handleSelectChange: (value: string) => void;
  selectItems: { key: string; value: string }[];
};

export const DrawerWithSelectItems = ({ isOpen, onClose, currentItem, handleSelectChange, selectItems }: DrawerWithSelectItemsProps) => {
  return (
    <BottomDrawer open={isOpen} onClose={() => {}} topTouchAreaStyle={{}}>
      <View className="flex justify-center align-bottom">
        <RadioGroup onValueChange={handleSelectChange} value={currentItem ?? ""}>
          {selectItems.map((item) => (
            <View key={item.value} className="flex flex-row items-center gap-2">
              <RadioGroupItem aria-labelledby={item.value} value={item.value} />
              <Label nativeID={item.value} onPress={() => handleSelectChange(item.value)}>
                {item.key}
              </Label>
            </View>
          ))}
        </RadioGroup>
      </View>
    </BottomDrawer>
  );
};
