import { useSlots } from 'vue';

export default function formComposable() {
  const slots = useSlots();

  return { slots };
}
