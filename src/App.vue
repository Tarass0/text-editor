<template>
  <div id="app">
    <MainPageLayout></MainPageLayout>
  </div>
</template>

<script>
import MainPageLayout from '@/components/main-page-layout/MainPageLayout.vue';

export default {
  name: 'App',
  components: {
    MainPageLayout,
  },
};
</script>

<style lang="scss">
html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: #0179f1;
}
button {
  padding: 5px 10px;
  cursor: pointer;
  font-size: 16px;
}
button:focus {
  outline: none;
}
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
#app {
  width: 100%;
  max-width: 700px;
  margin: auto;
  padding: 10px 15px;
  border: 1px solid #6f6f70;
}
</style>
