import React, { FC } from 'react';

const InstaIcon: FC = () => {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="8" fill="#AF1EBE"></rect>
      <path
        d="M16 7.12573C18.8904 7.12573 19.2327 7.13677 20.3742 7.18885C21.4296 7.23702 22.0028 7.41332 22.3842 7.56156C22.8544 7.73509 23.2797 8.01179 23.6289 8.37131C23.9884 8.72047 24.2651 9.14577 24.4386 9.61594C24.5869 9.99738 24.7632 10.5705 24.8113 11.6259C24.8634 12.7674 24.8744 13.1097 24.8744 16.0002C24.8744 18.8906 24.8634 19.2328 24.8113 20.3744C24.7632 21.4298 24.5868 22.0029 24.4386 22.3844C24.2585 22.8512 23.9827 23.2752 23.6289 23.629C23.2751 23.9828 22.8511 24.2587 22.3842 24.4387C22.0028 24.587 21.4296 24.7633 20.3742 24.8115C19.233 24.8635 18.8907 24.8746 16 24.8746C13.1094 24.8746 12.7672 24.8635 11.6258 24.8115C10.5704 24.7633 9.99729 24.5869 9.61581 24.4387C9.14564 24.2652 8.72034 23.9885 8.37118 23.629C8.01166 23.2798 7.73497 22.8545 7.56143 22.3844C7.41319 22.0029 7.23685 21.4298 7.18872 20.3744C7.13664 19.233 7.1256 18.8906 7.1256 16.0002C7.1256 13.1097 7.13664 12.7675 7.18872 11.6259C7.23689 10.5705 7.41319 9.99742 7.56143 9.61594C7.73498 9.14575 8.01171 8.72043 8.37127 8.37127C8.72043 8.01175 9.14573 7.73505 9.6159 7.56152C9.99733 7.41328 10.5705 7.23693 11.6259 7.18881C12.7674 7.13673 13.1097 7.12569 16.0001 7.12569L16 7.12573ZM16.0001 5.17529C13.0603 5.17529 12.6915 5.18775 11.5371 5.24043C10.3849 5.29303 9.59807 5.47599 8.90954 5.7436C8.18726 6.0154 7.53296 6.44149 6.99227 6.99214C6.44149 7.5328 6.01529 8.1871 5.74338 8.90941C5.47599 9.59798 5.29303 10.3848 5.24065 11.537C5.18775 12.6914 5.17529 13.0602 5.17529 16C5.17529 18.9399 5.18775 19.3086 5.24065 20.463C5.29324 21.6152 5.4762 22.4021 5.74381 23.0906C6.01562 23.8129 6.4417 24.4672 6.99236 25.0079C7.53304 25.5585 8.18734 25.9846 8.90962 26.2564C9.5982 26.524 10.385 26.707 11.5372 26.7596C12.6918 26.8123 13.0604 26.8247 16.0002 26.8247C18.94 26.8247 19.3088 26.8123 20.4632 26.7596C21.6154 26.707 22.4022 26.524 23.0908 26.2564C23.8098 25.9783 24.4629 25.553 25.008 25.0079C25.5532 24.4627 25.9785 23.8097 26.2566 23.0906C26.5242 22.402 26.7071 21.6152 26.7597 20.463C26.8124 19.3084 26.8249 18.9398 26.8249 16C26.8249 13.0602 26.8124 12.6914 26.7597 11.537C26.7071 10.3848 26.5242 9.59798 26.2566 8.90945C25.9848 8.18717 25.5587 7.53287 25.008 6.99218C24.4673 6.44142 23.813 6.01524 23.0906 5.74338C22.4021 5.47599 21.6152 5.29303 20.463 5.24065C19.3086 5.18775 18.9399 5.17529 16 5.17529H16.0001Z"
        fill="white"
      ></path>
      <path
        d="M16.0001 10.4413C14.9007 10.4413 13.826 10.7673 12.9118 11.3781C11.9977 11.9889 11.2853 12.857 10.8645 13.8727C10.4438 14.8884 10.3337 16.0061 10.5482 17.0844C10.7627 18.1626 11.2921 19.1531 12.0695 19.9305C12.8469 20.7079 13.8373 21.2373 14.9156 21.4518C15.9939 21.6663 17.1116 21.5562 18.1273 21.1355C19.143 20.7147 20.0111 20.0023 20.6219 19.0882C21.2327 18.174 21.5587 17.0993 21.5587 15.9999C21.5587 14.5257 20.9731 13.1118 19.9306 12.0694C18.8882 11.0269 17.4743 10.4413 16.0001 10.4413ZM16.0001 19.6082C15.2864 19.6081 14.5888 19.3965 13.9955 19C13.4021 18.6036 12.9396 18.04 12.6665 17.3807C12.3934 16.7214 12.322 15.9959 12.4612 15.296C12.6005 14.5961 12.9441 13.9531 13.4487 13.4485C13.9533 12.9439 14.5963 12.6003 15.2962 12.461C15.9961 12.3218 16.7216 12.3933 17.3809 12.6664C18.0402 12.9395 18.6038 13.402 19.0002 13.9953C19.3967 14.5887 19.6083 15.2863 19.6083 15.9999C19.6083 16.9569 19.2281 17.8747 18.5515 18.5513C17.8748 19.228 16.957 19.6082 16.0001 19.6082Z"
        fill="white"
      ></path>
      <path
        d="M21.7784 11.5207C22.4958 11.5207 23.0774 10.9392 23.0774 10.2218C23.0774 9.50441 22.4958 8.92285 21.7784 8.92285C21.0611 8.92285 20.4795 9.50441 20.4795 10.2218C20.4795 10.9392 21.0611 11.5207 21.7784 11.5207Z"
        fill="white"
      ></path>
    </svg>
  );
};

export default InstaIcon;
