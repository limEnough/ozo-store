<template>
  <component :is="DefaultLayout">
    <!-- 회원가입 페이지 -->
    <div class="create">
      <FormLayout
        @cancel="handleClickCancel"
        @submit="handleSubmit"
      >
        <form @submit.prevent>
          <Form>
            <!-- 약관 동의 -->
            <FormGroup
              use-title
              required
            >
              <template #title>
                <h3>Agree to Terms</h3>
              </template>

              <template #contents>
                <Checkbox
                  v-model="termsAgreement.value"
                  :is-error="termsAgreement.isError"
                  :error-message="termsAgreement.errorMessage"
                  :use-all-option="true"
                  :name="termsAgreement.name"
                  :options="termsAgreementOptions"
                  :use-front-label-text="true"
                  label-key="codeName"
                >
                  <template #all-label>약관 전체 동의하기</template>

                  <template #option-back-text="{ option }">
                    <template v-if="option.contentHtml">
                      <Button
                        size="s"
                        case="text"
                        @click="handleOpenTermsModal(option.code)"
                      >
                        <span>자세히</span>
                      </Button>
                    </template>
                  </template>
                </Checkbox>
              </template>
            </FormGroup>

            <!-- 개인정보 입력 -->
            <FormGroup
              class="create__user-info"
              use-title
              required
            >
              <template #title>
                <h3>User Info</h3>
              </template>

              <template #contents>
                <!-- 프로필 -->
                <FormItem
                  :hide-title="true"
                  class="create__user-info__profile"
                >
                  <template #contents>
                    <!-- TODO: 파일 업로드 컴포넌트 -->
                    <figure class="profile">
                      <img
                        src="../../../assets/images/member/image-profile-sample.png"
                        alt="프로필 이미지"
                        class="profile__image"
                      />
                    </figure>
                  </template>
                </FormItem>

                <!-- 이메일 -->
                <FormItem>
                  <template #title> Email </template>

                  <template #contents>
                    <Input
                      v-model="email.value"
                      :name="email.name"
                      :use-length-count="false"
                      :is-error="email.isError || !isPassDuplicateCheck"
                      :error-message="email.errorMessage || (!isPassDuplicateCheck ? duplicateCheckErrorMessage : '')"
                      :maxlength="email.max"
                      :allowed-regex="email.regex"
                      :disabled="isPassDuplicateCheck"
                      placeholder="이메일을 입력해주세요."
                      @blur="email.validate"
                    >
                      <!-- 이메일 중복 체크 버튼 -->
                      <template #button>
                        <Button
                          :disabled="isPassDuplicateCheck || !email.value.length"
                          size="s"
                          case="continue"
                          @click="onVerifyEmail"
                        >
                          <span>Check</span>
                        </Button>
                      </template>
                    </Input>
                  </template>

                  <!-- 이메일 중복 체크 완료 메시지 -->
                  <template
                    v-if="isPassDuplicateCheck"
                    #messages
                  >
                    ✅ 이메일 중복 체크를 완료하였습니다.
                  </template>
                </FormItem>

                <!-- 비밀번호 -->
                <FormItem>
                  <template #title> Password </template>

                  <template #contents>
                    <Input
                      v-model="password.value"
                      :name="password.name"
                      :use-length-count="false"
                      :is-error="password.isError"
                      :error-message="password.errorMessage"
                      :maxlength="password.max"
                      :allowed-regex="password.regex"
                      type="password"
                      placeholder="비밀번호를 입력해주세요."
                      visible
                      @blur="password.validate"
                    >
                    </Input>
                  </template>

                  <template #contents-sub>
                    <Input
                      v-model="passwordConfirm.value"
                      :name="passwordConfirm.name"
                      :use-length-count="false"
                      :is-error="passwordConfirm.isError"
                      :error-message="passwordConfirm.errorMessage"
                      :maxlength="passwordConfirm.max"
                      :allowed-regex="passwordConfirm.regex"
                      type="password"
                      placeholder="비밀번호를 한번 더 입력해주세요."
                      visible
                      @blur="passwordConfirm.validate"
                    >
                    </Input>
                  </template>
                </FormItem>

                <!-- 이름 -->
                <FormItem>
                  <template #title> Name </template>

                  <template #contents>
                    <Input
                      v-model="name.value"
                      :name="name.name"
                      :use-length-count="false"
                      :is-error="name.isError"
                      :error-message="name.errorMessage"
                      :maxlength="name.max"
                      :allowed-regex="name.regex"
                      placeholder="이름을 입력해주세요."
                      @blur="name.validate"
                    >
                    </Input>
                  </template>
                </FormItem>

                <!-- 휴대폰번호 -->
                <FormItem>
                  <template #title> Phone </template>

                  <template #contents>
                    <InputPhone
                      v-model:phone-number="phoneNumber.value"
                      :is-error="phoneNumber.isError"
                      :error-message="phoneNumber.errorMessage"
                      @blur="phoneNumber.validate"
                    ></InputPhone>
                  </template>
                </FormItem>

                <!-- 성별 -->
                <FormItem>
                  <template #title> Gender </template>

                  <template #contents>
                    <Radio
                      v-model="gender.value"
                      :options="genderOptions"
                      :name="gender.name"
                      error-message=""
                      type="card"
                    ></Radio>
                  </template>
                </FormItem>

                <!-- 생년월일 -->
                <FormItem>
                  <template #title> Birth </template>

                  <template #contents>
                    <Selectbox
                      v-model="birthYear.value"
                      :rows="birthOptions.year"
                      :name="birthYear.name"
                      :is-error="birthYear.isError"
                      size="s"
                    >
                      {{ birthYear.value.codeName }}
                    </Selectbox>

                    <Selectbox
                      v-model="birthMonth.value"
                      :readonly="!birthYear.value.code"
                      :rows="birthOptions.month"
                      :name="birthMonth.name"
                      :is-error="birthMonth.isError"
                      size="s"
                      @selected="changedBirthMonth($event)"
                    >
                      {{ birthMonth.value.codeName }}
                    </Selectbox>

                    <Selectbox
                      v-model="birthDate.value"
                      :readonly="!birthYear.value.code || !birthMonth.value.code"
                      :rows="birthOptions.date"
                      :name="birthDate.name"
                      :is-error="birthDate.isError"
                      size="s"
                    >
                      {{ birthDate.value.codeName }}
                    </Selectbox>
                  </template>

                  <!-- MEMO: 셀렉트박스가 그룹으로 묶여있기에 상위에서 에러 메시지 노출 -->
                  <template #messages>
                    <span class="error">{{ birthErrorMessage }}</span>
                  </template>
                </FormItem>
              </template>
            </FormGroup>

            <!-- TODO: 주소지 입력 컴포넌트 -->
          </Form>
        </form>
      </FormLayout>
    </div>

    <!-- 약관 모달 -->
    <template v-if="isOpenTermsModal">
      <TermsModal
        :terms-code="selectedTermsCode as MemberTermsCode"
        @close="closeTermsModal"
      >
      </TermsModal>
    </template>
  </component>
</template>

<script setup lang="ts">
  import createComposable from '@/composables/views/member/create';
  import Form from '@/components/modules/form.vue';
  import DefaultLayout from '@/components/layouts/default-layout.vue';
  import FormLayout from '@/components/layouts/form-layout.vue';
  import FormGroup from '@/components/modules/form-group.vue';
  import FormItem from '@/components/modules/form-item.vue';
  import Input from '@/components/elements/input.vue';
  import Button from '@/components/elements/button.vue';
  import InputPhone from '@/components/elements/input-phone.vue';
  import Radio from '@/components/elements/radio.vue';
  import Selectbox from '@/components/elements/selectbox.vue';
  import Checkbox from '@/components/elements/checkbox.vue';
  import TermsModal from '@/components/modules/modals/terms-modal.vue';
  import type { MemberTermsCode } from '@/constants/member-constants';

  const {
    termsAgreementOptions,
    genderOptions,
    birthOptions,

    termsAgreement,
    email,
    password,
    name,
    passwordConfirm,
    phoneNumber,
    gender,
    birthYear,
    birthMonth,
    birthDate,

    birthErrorMessage,
    isPassDuplicateCheck,
    duplicateCheckErrorMessage,

    changedBirthMonth,
    onVerifyEmail,
    handleClickCancel,
    handleSubmit,
    handleOpenTermsModal,

    selectedTermsCode,
    isOpenTermsModal,
    closeTermsModal,
  } = createComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/member/create/index.scss';
</style>
