import { SRLWrapper } from 'simple-react-lightbox';

const options = {
  settings: {
    disablePanzoom: true,
    overlayColor: 'rgba(255, 255, 255, 1)',
  },
  thumbnails: {
    showThumbnails: true,
    thumbnailsAlignment: 'center',
    thumbnailsContainerPadding: '8px',
    thumbnailsGap: '8px 8px',
    thumbnailsPosition: 'bottom',
    thumbnailsSize: ['70px', '70px'],
  },
  buttons: {
    showAutoplayButton: false,
    showDownloadButton: false,
    showFullscreenButton: false,
    showThumbnailsButton: false,
    backgroundColor: '#f2f2f2',
    iconColor: '#af1ebe',
  },
};
const LightboxViewer = (props) => {
  const { images, onClose } = props;

  const callbacks = {
    onLightboxClosed: onClose,
  };

  return (
    <div style={{ display: 'none' }}>
      <SRLWrapper options={options} callbacks={callbacks}>
        {images.map((image) => (
          <img key={image.id} src={image.url} />
        ))}
      </SRLWrapper>
    </div>
  );
};

export { LightboxViewer };
