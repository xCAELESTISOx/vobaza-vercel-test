import type { DeviceType, ITag } from "entities/tags/model/ITag";

export const filterTagsByScreenWidth = (tags: ITag[], currentDevice: DeviceType, showHiddenTags: boolean, currentTag: ITag) => {
  const filteredTags = tags.filter(
    (tag) =>
      showHiddenTags || currentTag?.id === tag.id || !tag.device_to_hide || !tag.device_to_hide?.includes(currentDevice)
  );

  if (showHiddenTags) {
    const prevFilteredTags = tags.filter(
      (tag) => currentTag?.id === tag.id || !tag.device_to_hide || !tag.device_to_hide?.includes(currentDevice)
    );


    const activeFilteredIndex = prevFilteredTags.findIndex((item) => item.id === currentTag?.id);

    if(activeFilteredIndex >= 0) {
      const activeTag = prevFilteredTags[activeFilteredIndex];
      const allTagsWithoutActive = [...tags.filter((item) => item.id !== currentTag?.id)];
      allTagsWithoutActive.splice(activeFilteredIndex, 0, activeTag);
  
      return allTagsWithoutActive;
    }

  }

  return filteredTags;
};