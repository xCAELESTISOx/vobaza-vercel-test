import type { DeviceType, ITag } from "entities/tags/model/ITag";

export const filterTagsByScreenWidth = (tags: ITag[], currentDevice: DeviceType, showHiddenTags: boolean, currentTag: ITag) => {
  const filteredTags = tags.filter(
    (tag) =>
      showHiddenTags || currentTag?.id === tag.id || !tag.device_to_hide || !tag.device_to_hide?.includes(currentDevice)
  );
  const prevFilteredTags = tags.filter(
    (tag) =>  !tag.device_to_hide || !tag.device_to_hide?.includes(currentDevice)
  );
  const hiddenTags = tags.filter((itemTag) => !prevFilteredTags.find((tag) =>  (itemTag.id === tag.id)))
  const newAllTags =  [...prevFilteredTags, ...hiddenTags];

  if (showHiddenTags) {
    const activeFilteredIndex = prevFilteredTags.findIndex((item) => item.id === currentTag?.id) ;
    if(activeFilteredIndex >= 0) {
      const activeTag = prevFilteredTags[activeFilteredIndex];
      const allTagsWithoutActive = [...newAllTags.filter((item) => item.id !== currentTag?.id)];
      allTagsWithoutActive.splice(activeFilteredIndex, 0, activeTag);
      return allTagsWithoutActive;
    } 

    return newAllTags;
  } else {
    const activeFilteredIndex = newAllTags.findIndex((item) => item.id === currentTag?.id);

    if(activeFilteredIndex > -1 && (prevFilteredTags.length - 1 < activeFilteredIndex)) return [ ...prevFilteredTags, newAllTags[activeFilteredIndex]];
  }

  return filteredTags;
};