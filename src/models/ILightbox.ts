export interface ILightboxOptions {
  settings: {
      disablePanzoom: boolean;
      overlayColor: string;
  };
  thumbnails: {
      showThumbnails: boolean;
      thumbnailsAlignment: string;
      thumbnailsContainerPadding: string;
      thumbnailsGap: string;
      thumbnailsPosition: string;
      thumbnailsSize: string[];
  };
  buttons: {
    showAutoplayButton: boolean;
    showDownloadButton: boolean;
    showFullscreenButton: boolean;
    showThumbnailsButton: boolean;
    backgroundColor: string;
    iconColor: string;
    showNextButton: boolean;
    showPrevButton: boolean;
  };
}