import { SRLWrapper } from 'simple-react-lightbox';

import type { ImageVariant } from 'src/models/IImage';
import type { ILightboxOptions } from 'src/models/ILightbox';

const BASIC_OPTIONS: ILightboxOptions = {
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
    showNextButton: true,
    showPrevButton: true,
  },
};
interface IProps {
  images: ImageVariant[];
  onClose: (e) => void;
  buttons?: {
    showNextButton: boolean;
    showPrevButton: boolean;
  };
}

const LightboxViewer = ({ images, onClose, buttons }: IProps) => {
  const options = buttons ? { ...BASIC_OPTIONS, buttons: { ...BASIC_OPTIONS.buttons, ...buttons } } : BASIC_OPTIONS;

  const callbacks = {
    onLightboxClosed: onClose,
  };

  return (
    <div style={{ display: 'none' }}>
      <SRLWrapper options={options} callbacks={callbacks}>
        {images.map((image) => (
          <img key={image.id} src={image.url} alt="" />
        ))}
      </SRLWrapper>
    </div>
  );
};

export { LightboxViewer };
