import { ref } from 'vue';

export default function mainComposable() {
  // TODO: 데이터화
  const mainBannerUseYn = ref(true);
  const mainBannerSlides = ref([
    {
      link: '',
      imagePath: 'src/assets/images/main/img-banner-1.png',
      externalLink: '',
      src: '',
    },
    {
      link: '',
      imagePath: 'src/assets/images/main/img-banner-2.png',
      externalLink: '',
      src: '',
    },
    {
      link: '',
      imagePath: 'src/assets/images/main/img-banner-3.png',
      externalLink: '',
      src: '',
    },
    {
      link: '',
      imagePath: 'src/assets/images/main/img-banner-4.png',
      externalLink: '',
      src: '',
    },
  ]);
  return { mainBannerUseYn, mainBannerSlides };
}
