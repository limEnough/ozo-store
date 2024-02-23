<template>
  <component :is="DefaultLayout">
    <div class="create">
      <FormLayout
        @cancel="handleClickCancel"
        @submit="handleSubmit"
      >
        <form @submit.prevent>
          <Form>
            <!-- TODO: 약관 동의 -->
            <FormGroup
              use-title
              required
            >
              <template #title>
                <h3>Agree to Terms</h3>
              </template>

              <template #contents> 약관 아코디언 넣어놓기 </template>
            </FormGroup>

            <!-- TODO: 본인 인증 -->
            <FormGroup
              use-title
              required
            >
              <template #title>
                <h3>Certification</h3>
              </template>

              <template #contents>
                <FormItem>
                  <template #title> Phone </template>

                  <template #contents> 휴대폰 인증 필요 </template>
                </FormItem>
              </template>
            </FormGroup>

            <!-- 개인정보 입력 -->
            <FormGroup
              class="create__userInfo"
              use-title
              required
            >
              <template #title>
                <h3>User Info</h3>
              </template>

              <template #contents>
                <!-- 프로필 -->
                <FormItem
                  :no-title="true"
                  class="create__userInfo__profile"
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
                      :is-error="email.isError"
                      :error-message="email.errorMessage"
                      :maxlength="email.max"
                      :allowed-regex="email.regex"
                      placeholder="이메일을 입력해주세요."
                    >
                      <template #button>
                        <Button
                          size="s"
                          case="success"
                        >
                          <span>Check</span>
                        </Button>
                      </template>
                    </Input>
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
                    >
                    </Input>
                  </template>
                </FormItem>

                <!-- 이름 (수정불가) -->
                <!-- 생년월일 (수정불가) -->
                <!-- 휴대폰번호 (수정불가) -->
                <!-- 성별 (수정불가) -->
              </template>
            </FormGroup>

            <!-- TODO: 주소지 입력 -->
          </Form>
        </form>
      </FormLayout>
    </div>
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

  const { handleClickCancel, handleSubmit, email, password, name, passwordConfirm } = createComposable();
</script>

<style lang="scss" scoped>
  @import '@/styles/member/create.scss';
</style>
