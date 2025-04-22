<template>
    <div class="container flex flex-col p-8">
      <h2 class="text-2xl leading-7 font-semibold mb-4">Accept the invite to use ChatSetter on Instagram</h2>
      <p class="mb-3">Integrate ChatSetter AI with Instagram:</p>
      <p>1. Go to <a class="link" href="https://www.instagram.com/accounts/manage_access" target="_blank">https://www.instagram.com/accounts/manage_access</a></p>
      <p>2. Navigate to "Tester Invites"</p>
      <p>3. Click "Accept"</p>
      <br/>
      <img src="~/assets/images/instagram-accept-invite.png" class="how-to-accept" />
    </div>
</template>

<script>
export default {
  name: 'InstagramInvitePage',
  layout: 'app',
  methods: {
  }
}
</script>

<style lang="scss">
$chatsetterGreen: #046c38;
.how-to-accept {
    width: 100%;
    max-width: 600px;
}
.link {
    font-weight: 500;
    text-decoration: underline;
    color: $chatsetterGreen;
}
</style>