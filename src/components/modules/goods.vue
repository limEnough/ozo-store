<template>
  <div
    :type="type"
    :class="goodsClasses"
    class="goods-component"
  >
    <!-- 상품 썸네일 -->
    <Button
      :tag="hasUrl ? 'router-link' : 'button'"
      :to="url"
      :target="openOnNewTab ? '_blank' : ''"
      class="goods-component__thumb"
    >
      <!-- 이미지 -->
      <img
        v-lazy="goods.imagePath ?? ''"
        :alt="`${goods.displayGoodsName} 상품이미지`"
      />
      <!-- TODO: 뱃지 -->
      <slot name="badge"></slot>
    </Button>

    <!-- 상품 정보 -->
    <div class="goods-component__info">
      <component
        :is="isTypeCart ? 'div' : 'router-link'"
        :to="url"
        :target="openOnNewTab ? '_blank' : ''"
        class="goods-component__info__link"
      >
        <!-- [list|order|slide] 브랜드명 -->
        <span
          v-if="!isTypeCart"
          class="goods-component__info__brand"
        >
          {{ goods.brandName }}
        </span>

        <!-- [공통] 상품명 -->
        <span class="goods-component__info__name">
          {{ goods.displayGoodsName }}
        </span>

        <!-- [list|cart|slide] 가격 -->
        <div
          v-if="!isTypeOrder"
          class="goods-component__info__price"
        >
          <!-- 품절 | 판매종료 -->
          <template v-if="isSoldOut || isSoldStop">
            <span
              v-if="isSoldOut"
              class="price--sold-out"
            >
              품절
            </span>
            <span
              v-else
              class="price--sold-out"
            >
              판매중지
            </span>
          </template>

          <!-- 판매중 -->
          <template v-else>
            <!-- case. 할인 -->
            <template v-if="isDiscount">
              <!-- 원가 -->
              <span class="price--origin">
                {{ goods.originPrice }}
              </span>
              <!-- 할인율 | 판매가 -->
              <span class="price__box">
                <!-- 할인율 -->
                <span class="price--rate">
                  {{ goods.discountRate }}
                </span>
                <!-- 판매가 -->
                <span class="price--current">
                  {{ goods.salePrice }}
                </span>
              </span>
            </template>

            <!-- case. 정가 -->
            <span
              v-else
              class="price--current"
            >
              {{ goods.salePrice }}
            </span>
          </template>
        </div>

        <!-- 옵션 -->
        <template v-if="goods.options?.length">
          <dl
            v-for="(option, index) in goods.options"
            :key="`goods-option-${index}`"
            class="goods-component__info__option"
          >
            <dt class="option__name">[{{ option.name }}]</dt>
            <dd class="option__value">
              {{ option.value }}
            </dd>
          </dl>
        </template>

        <!-- [order] 결제금액 | 수량 -->
        <div
          v-if="isTypeOrder"
          class="goods-component__info__etc"
        >
          <span class="etc__text">
            {{ goods.salePrice }}
          </span>
          <span class="etc__text">{{ goods?.buyCnt || 1 }}개</span>
        </div>
      </component>
    </div>

    <!-- [list|slide] 관심상품 버튼 -->
    <div
      v-if="!hideWish && !isTypeCart && !isTypeOrder"
      class="goods-component__wish"
    >
      <Checkbox
        v-model="goods.isWish"
        name="wish"
        class="goods-component__wish__button"
        icon-only
        @click="handleToggleWish($event)"
      >
        <span class="blind">관심상품 등록</span>
      </Checkbox>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import goodsComposable, { goodsEmits, goodsProps } from '@/composables/modules/goods';
  import Button from '@/components/elements/button.vue';
  import Checkbox from '@/components/elements/checkbox.vue';

  const emits = defineEmits(goodsEmits);
  const props = defineProps(goodsProps);

  const { goodsClasses, hasUrl, url, isTypeOrder, isTypeCart, isDiscount, isSoldOut, isSoldStop, handleToggleWish } =
    goodsComposable(emits, props);
</script>

<style lang="scss" scoped>
  @import '@/styles/components/modules/goods.scss';
</style>
