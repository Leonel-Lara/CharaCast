<template>
  <router-view :key="$route.fullPath" />
</template>

<style lang="scss">
:root {
  --primary: #282828;
  --secondary: #fca842;
  --green1: #1ab43b;
  --yellow1: #f9cc00;
  --blue1: #004fea;
  --dark1: #050a0e;
  --dark2: #1a1a1a;
  --dark3: #383838;
  --dark4: #5a5a5a;
  --dark5: #868686;
  --dark-blue: #12141f;
  --dark-gradient: linear-gradient(0deg, #011c2a, #01111a);
  --red1: #eb2f2f;
  --box-shadow-default: 0 30px 54px 0 rgba(35, 54, 70, 0.12);
}

*:not(path) {
  border: none;
  outline: none;
  margin: 0;
  padding: 0;
  font-family: fontRegular;
  text-decoration: none;
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  list-style: none;
}

html,
body {
  min-width: 100vw;
  min-height: 100vh;
  background-color: #f5f5f5;
}

h1,
h2,
h3,
h4,
h5,
h6,
p,
span,
label,
a,
svg,
div {
  font-size: 14px;
  color: var(--primary);
}

@font-face {
  font-family: "fontRegular";
  src: url("../public/fonts/Poppins-Regular.ttf");
  font-display: swap;
}

@font-face {
  font-family: "fontLight";
  src: url("../public/fonts/Poppins-Light.ttf");
  font-display: swap;
}

@font-face {
  font-family: "fontMedium";
  src: url("../public/fonts/Poppins-Medium.ttf");
  font-display: swap;
}

@font-face {
  font-family: "fontBold";
  src: url("../public/fonts/Poppins-Bold.ttf");
  font-display: swap;
}

img {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-select: none;
}

.pointer {
  cursor: pointer;
}
</style>
