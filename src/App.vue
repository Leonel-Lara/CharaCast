<template>
  <div id="app">
    <router-view :key="$route.fullPath" />
  </div>
</template>

<style lang="scss">
:root {
  --primary: #131313;
  --secondary: #eee;
  --green1: #488b3c;
  --yellow1: #f9cc00;
  --blue1: #004fea;
  --dark1: #050a0e;
  --dark2: #1a1a1a;
  --dark3: #383838;
  --dark4: #5a5a5a;
  --dark5: #868686;
  --dark-gradient: linear-gradient(0deg, #011c2a, #01111a);
  --red1: #eb2f2f;
  --box-shadow-default: 0 30px 54px 0 rgba(35, 54, 70, 0.12);
}

* {
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

body::-webkit-scrollbar {
  width: 0.25em;
}

body::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

body::-webkit-scrollbar-thumb {
  background-color: var(--primary);
  outline: 0px solid slategrey;
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

html,
body {
  min-height: 100vh;
  min-width: 100vw;
  overflow-x: hidden;
}

img {
  -webkit-user-select: none;
  -webkit-user-drag: none;
  -khtml-user-drag: none;
  -moz-user-drag: none;
  -o-user-drag: none;
  user-select: none;
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

.pointer {
  cursor: pointer;
}

.swiper-pagination-bullet-active {
  background: var(--secondary) !important;
}

.swiper-button-next,
.swiper-button-prev {
  width: 40px !important;
  height: 40px !important;
  border-radius: 100%;
  background-color: #00000088;
  color: #fff !important;
  z-index: 2;
  &::after {
    font-size: 1.2rem !important;
  }
}
.swiper-button-next {
  right: 50px !important;
  @media only screen and (max-width: 720px) {
    right: 25px !important;
  }
}
.swiper-button-prev {
  left: 50px !important;
  @media only screen and (max-width: 720px) {
    left: 25px !important;
  }
}

.btn {
  position: relative;
  padding: 16px 24px;
  border-radius: 0.6rem;
  background-color: var(--primary);
  margin: 25px auto 0 auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12);
  transition: transform 0.25s ease;
  span {
    color: #fff;
  }
  &:hover {
    transform: translateY(-3px);
  }
  &.border {
    padding: 14px 24px;
    border: 1px solid #000;
    background-color: transparent;
    box-shadow: none;
    span {
      color: #000;
    }
  }
  &.icon {
    padding: 12px 24px;
    gap: 0.75rem;
    .material-design-icon {
      display: flex;
    }
  }
}

.input-item {
  position: relative;
  width: 100%;
  margin: 1.35rem 0 0 0;

  span {
    position: relative;
    display: block;
    font-family: fontLight;
    font-size: 0.9rem;
    color: var(--primary);
  }

  input,
  select,
  select option {
    position: relative;
    font-family: fontRegular;
    font-size: 1rem;
    width: 100%;
    height: 44px;
    border-radius: 6px;
    padding: 0.25rem 0.85rem;
    color: var(--primary);
    background-color: #eeeeee;
    &::placeholder {
      color: var(--dark5);
      font-family: fontLight;
      font-size: 1rem;
    }
  }
  select option:disabled {
    color: #aaa !important;
  }
  textarea {
    position: relative;
    width: 100%;
    height: 150px;
    padding: 0.65rem 0.85rem;
    border-radius: 6px;
    background-color: #eeeeee;
    font-family: fontRegular;
    font-size: 1rem;
    color: var(--primary);
    resize: none;
    &::-webkit-scrollbar {
      width: 0.3em;
    }

    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
      box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--primary);
      outline: 1px solid slategrey;
    }
  }
}

.container {
  position: relative;
  width: 80%;
  max-width: 1340px;
  margin: 0 auto;
  @media only screen and (max-width: 1159px) {
    width: 90%;
  }
}

.style-scrollbar {
  overflow-y: auto;
  &::-webkit-scrollbar {
    width: 0.25em;
  }
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--dark4);
    outline: 0px solid slategrey;
  }
}

.bg-cover {
  position: fixed;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

.divider {
  position: relative;
  width: 100%;
  height: 1px;
  margin: 60px auto;
  background-color: #e9e9e9;
}

.flex {
  display: flex;
  position: relative;
  width: 100%;
  align-items: center;
}

.flex-between {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.flex-end {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
}

.loading {
  animation-duration: 0.8s;
  animation-iteration-count: infinite;
  animation-name: rotate-forever;
  animation-timing-function: linear;
  height: 22px;
  width: 22px;
  border: 2px solid var(--secondary);
  border-right-color: transparent;
  border-radius: 50%;
  display: inline-block;
}

.loading.black {
  border: 2px solid #000;
  border-right-color: transparent;
}

.loading.white {
  border: 2px solid #fff;
  border-right-color: transparent;
}

@keyframes rotate-forever {
  0% {
    -webkit-transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -ms-transform: rotate(0deg);
    -o-transform: rotate(0deg);
    transform: rotate(0deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
    -moz-transform: rotate(360deg);
    -ms-transform: rotate(360deg);
    -o-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.filter-holder {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 1.6rem;
  padding-bottom: 1.2rem;
  .filter {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 6px 0px;
    border: 1px solid var(--secondary);
    border-radius: 12px;
    gap: 8px;
    cursor: pointer;
    transition: all 0.25s ease-in-out;
    img {
      filter: grayscale(100%);
    }
    span {
      color: #707070;
    }
  }
}

.character-holder {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 40px;
  .btn {
    margin: 40px auto 0 auto;
  }
}

.quantity-holder {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  width: 100%;
  span {
    font-size: 1.2rem;
    color: var(--dark4);
    font-family: fontMedium;
  }
  @media only screen and (max-width: 720px) {
    justify-content: center;
  }
}

.cards-holder {
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-content: space-between;
  gap: 4em;
  @media only screen and (min-width: 901px) and (max-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  @media only screen and (max-width: 900px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 0.5fr));
    justify-content: center;
  }
}

.card-holder {
  position: relative;
  height: 440px;
  background-color: var(--green1);
  border-radius: 12px;
  box-shadow: var(--box-shadow-default);
  padding-top: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media only screen and (max-width: 900px) {
    padding-top: 1rem;
  }
  .card-name {
    text-align: center;
    color: #fff;
    font-size: 1.6rem;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    cursor: default;
  }
  .card-img {
    position: relative;
    bottom: -10px;
    width: 160px;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    img {
      position: relative;
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
  .details-holder {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 220px;
    background-color: #fff;
    border-radius: 20px 20px 12px 12px;
    .details {
      position: relative;
      width: 100%;
      height: 77%;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
}
</style>
