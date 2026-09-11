<script setup>

import { BIconCloudSunFill, BIconCloudMoonFill, BIconList } from 'bootstrap-icons-vue'
// BORDA ANIMADAAAA PRO LINK ATIVO
import { ref, reactive, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'

// tema escuro
let isDark;
if (localStorage.getItem('theme') == 'dark') {
  isDark = ref(true)
  document.body.classList.toggle('dark')
} else { isDark = ref(false) }
const linksContainer = ref(null)
const route = useRoute()
const tracerSentinel = ref(null)
let tracerObserver = null


const border = reactive({
  left: '0px',
  width: '0px'
})

// encontra o link dentro do container correspondente à rota atual
const findActiveLink = () => {
  if (!linksContainer.value) return null
  const anchors = Array.from(linksContainer.value.querySelectorAll('a'))
  const routePath = route.path

  let found = anchors.find(a => {
    try {
      const p = new URL(a.href, window.location.origin).pathname
      return p === routePath
    } catch {
      return false
    }
  })
  // tenta achar por prefixo (ex: /loja e /loja/alguma-coisa)
  if (!found) {
    found = anchors.find(a => {
      try {
        const p = new URL(a.href, window.location.origin).pathname
        return p !== '/' && routePath.startsWith(p)
      } catch {
        return false
      }
    })
  }
  if (!found) {
    found = linksContainer.value.querySelector('.router-link-exact-active, .router-link-active')
  }
  return found
}
// atualiza left/width da borda
const updateBorder = () => {
  if (!linksContainer.value) return
  const activeLink = findActiveLink()
  if (!activeLink) return

  const rect = activeLink.getBoundingClientRect()
  const parentRect = linksContainer.value.getBoundingClientRect()
  border.left = `${rect.left - parentRect.left}px`
  border.width = `${rect.width}px`
}

// espera o DOM/layout estabilizar antes de medir
const measureAfterLayout = async () => {
  if (!linksContainer.value) return
  await nextTick()
  updateBorder()
}

onMounted(() => {
    measureAfterLayout()
    // recalcula borda header ao redimensionar ou quando a página carregar completamente
    window.addEventListener('resize', measureAfterLayout)
    window.addEventListener('load', measureAfterLayout)
    
    // Vetor que segue na tela (sticky)
    const tracer = document.querySelector('.icon-tracer')
    tracerObserver = new IntersectionObserver(
        ([e]) => {
            if(tracer) tracer.classList.toggle('sticking', e.intersectionRatio < 1)
        },
        { threshold: [0, 1] }
    );
    if (tracerSentinel.value) {
        tracerObserver.observe(tracerSentinel.value)
    }
})

// sempre que a rota muda, recalcula borda header
watch(() => route.path, async () => {
  await nextTick()
  measureAfterLayout()
})

function takeToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
}

function changeTheme() {
  document.body.classList.toggle('dark')
  isDark.value = !isDark.value
  if (localStorage.getItem('theme') == 'dark'){
    localStorage.setItem('theme', '')
  } else {
    localStorage.setItem('theme', 'dark')
  }
}

function toggleMenu() {
  const nav = document.querySelector('.links');
  nav.classList.toggle('navShow');
}

</script>

<template>
    <header>
        <div class="top">
          <svg viewBox="0 0 295 51" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M155.222 49.9899V4.13055H172.126L177.498 45.6664H178.678V4.13055H187.325V49.9899H170.421L165.049 8.45409H163.87V49.9899H155.222Z"/>
              <path d="M10.4533 49.9899L0.100861 4.13055H9.01208L17.9879 45.6664H19.1678L28.1436 4.13055H37.0548L26.7024 49.9899H10.4562H10.4533Z"/>
              <path d="M67.5837 49.9899V12.3843H55.3968V4.13055H88.4176V12.3843H76.2308V49.9899H67.5837Z"/>
              <path d="M133.493 8.72115C133.015 7.03929 133.2 5.4543 134.048 3.96616C134.896 2.47508 136.138 1.49767 137.776 1.03097C139.414 0.567213 140.984 0.743323 142.493 1.56224C143.995 2.38409 144.987 3.63155 145.466 5.31341C145.944 6.99527 145.759 8.58027 144.911 10.0684C144.063 11.5595 142.821 12.5369 141.183 13.0036C139.546 13.4674 137.975 13.2912 136.47 12.4723C134.964 11.6505 133.972 10.403 133.493 8.72115Z"/>
              <path d="M152.936 33.1683L146.226 41.2636L145.472 41.0023L144.75 24.1074C144.726 23.7082 144.682 23.309 144.615 22.9216C144.55 22.5312 144.471 22.1672 144.374 21.8297C143.79 19.7751 142.645 18.3486 140.946 17.5619C139.246 16.7753 137.47 16.6432 135.624 17.1686C134.785 17.4064 133.96 17.7762 133.147 18.2811C132.337 18.783 131.594 19.4493 130.922 20.2741L123.543 29.0503L122.554 30.1187C121.682 29.241 120.534 28.7244 119.12 28.563V27.3831C121.171 26.5113 122.712 25.2551 123.74 23.6172C124.764 21.9794 125.278 20.2212 125.278 18.3427V16.7724C125.278 14.4125 124.732 12.2815 123.64 10.3825C122.548 8.48341 120.934 6.96592 118.794 5.83001C116.654 4.69409 114.012 4.12466 110.866 4.12466H93.3077V49.9869H101.955V32.6899H111.914C113.179 32.6899 114.083 33.0186 114.632 33.6732C115.178 34.3277 115.451 35.1789 115.451 36.2268V49.9869H124.098V40.1541L129.196 33.8463L135.991 25.6454L136.745 25.9096L137.465 42.8016C137.488 43.2037 137.535 43.6 137.6 43.9903C137.664 44.3807 137.746 44.7447 137.84 45.0793C138.427 47.1369 139.569 48.5634 141.272 49.3471C142.968 50.1337 144.744 50.2658 146.593 49.7433C147.432 49.5026 148.266 49.1181 149.091 48.5869C149.916 48.0585 150.649 47.4069 151.292 46.632L152.933 44.683V33.1683H152.936ZM116.631 18.8065C116.631 20.5529 116.085 21.9295 114.993 22.9333C113.901 23.9401 112.307 24.4391 110.211 24.4391H101.958V12.3843H110.211C112.31 12.3843 113.904 12.942 114.993 14.0544C116.085 15.1668 116.631 16.4906 116.631 18.0198V18.8065Z"/>
              <path d="M192.215 49.9899V4.13055H221.173V12.3843H200.865V22.8658H220.387V31.1196H200.865V41.7332H221.96V49.9869H192.218L192.215 49.9899Z"/>
              <path d="M226.063 49.9899V4.13055H244.015C247.158 4.13055 249.768 4.77629 251.843 6.0619C253.918 7.35045 255.468 9.00883 256.495 11.04C257.52 13.0711 258.036 15.1991 258.036 17.4269V19.0002C258.036 21.272 257.523 23.4558 256.495 25.5515C255.468 27.6473 253.918 29.3614 251.843 30.694C249.768 32.0266 247.158 32.6928 244.015 32.6928H234.71V49.9899H226.063ZM234.713 24.4391H243.164C245.086 24.4391 246.604 23.9137 247.716 22.8658C248.828 21.818 249.386 20.4649 249.386 18.8035V18.0169C249.386 16.3585 248.828 15.0025 247.716 13.9546C246.604 12.9068 245.083 12.3814 243.164 12.3814H234.713V24.4362V24.4391Z"/>
              <path d="M262.926 49.9899V4.13055H280.878C284.021 4.13055 286.631 4.77629 288.706 6.0619C290.781 7.35045 292.331 9.00883 293.358 11.04C294.385 13.0711 294.899 15.1991 294.899 17.4269V19.0002C294.899 21.272 294.385 23.4558 293.358 25.5515C292.331 27.6473 290.781 29.3614 288.706 30.694C286.631 32.0266 284.021 32.6928 280.878 32.6928H271.573V49.9899H262.926ZM271.576 24.4391H280.027C281.949 24.4391 283.467 23.9137 284.579 22.8658C285.691 21.818 286.249 20.4649 286.249 18.8035V18.0169C286.249 16.3585 285.691 15.0025 284.579 13.9546C283.467 12.9068 281.946 12.3814 280.027 12.3814H271.576V24.4362V24.4391Z"/>
              <path d="M50.5068 4.13055H41.8597V50.6679H50.5068V4.13055Z"/>
          </svg>
          <button class="themebtn" @click="changeTheme">
            <BIconCloudSunFill v-if="isDark"></BIconCloudSunFill>
            <BIconCloudMoonFill v-else></BIconCloudMoonFill>
          </button>
        </div>
        <nav class="links" ref="linksContainer">
            <router-link to="/" @click="toggleMenu">Home</router-link>
            <router-link to="/loja" @click="toggleMenu"
                :class="{ 'router-link-active': $route.path.startsWith('/loja') }"
            >Loja</router-link>
            <router-link to="/marcas" @click="toggleMenu"
                :class="{ 'router-link-active': $route.path.startsWith('/marcas') }"
            >Designers/Marcas</router-link>
            <router-link to="/sobre-nos" @click="toggleMenu">Sobre nós</router-link>

            <!-- borda -->
             <span class="active-border" :style="{ left: border.left, width: border.width }" aria-hidden="true"></span>

        </nav>
        <div class="modal-bg" aria-hidden="true" @click="toggleMenu"></div>
        <div class="menuToggle" @click="toggleMenu">
            <BIconList></BIconList>
        </div>
    </header>
    <div ref="tracerSentinel" style="height: 1px"></div>
    <span class="icon-tracer" id="tracer" @click="takeToTop">
        <svg viewBox="0 0 295 51" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M155.222 49.9899V4.13055H172.126L177.498 45.6664H178.678V4.13055H187.325V49.9899H170.421L165.049 8.45409H163.87V49.9899H155.222Z"/>
            <path d="M10.4533 49.9899L0.100861 4.13055H9.01208L17.9879 45.6664H19.1678L28.1436 4.13055H37.0548L26.7024 49.9899H10.4562H10.4533Z"/>
            <path d="M67.5837 49.9899V12.3843H55.3968V4.13055H88.4176V12.3843H76.2308V49.9899H67.5837Z"/>
            <path d="M133.493 8.72115C133.015 7.03929 133.2 5.4543 134.048 3.96616C134.896 2.47508 136.138 1.49767 137.776 1.03097C139.414 0.567213 140.984 0.743323 142.493 1.56224C143.995 2.38409 144.987 3.63155 145.466 5.31341C145.944 6.99527 145.759 8.58027 144.911 10.0684C144.063 11.5595 142.821 12.5369 141.183 13.0036C139.546 13.4674 137.975 13.2912 136.47 12.4723C134.964 11.6505 133.972 10.403 133.493 8.72115Z"/>
            <path d="M152.936 33.1683L146.226 41.2636L145.472 41.0023L144.75 24.1074C144.726 23.7082 144.682 23.309 144.615 22.9216C144.55 22.5312 144.471 22.1672 144.374 21.8297C143.79 19.7751 142.645 18.3486 140.946 17.5619C139.246 16.7753 137.47 16.6432 135.624 17.1686C134.785 17.4064 133.96 17.7762 133.147 18.2811C132.337 18.783 131.594 19.4493 130.922 20.2741L123.543 29.0503L122.554 30.1187C121.682 29.241 120.534 28.7244 119.12 28.563V27.3831C121.171 26.5113 122.712 25.2551 123.74 23.6172C124.764 21.9794 125.278 20.2212 125.278 18.3427V16.7724C125.278 14.4125 124.732 12.2815 123.64 10.3825C122.548 8.48341 120.934 6.96592 118.794 5.83001C116.654 4.69409 114.012 4.12466 110.866 4.12466H93.3077V49.9869H101.955V32.6899H111.914C113.179 32.6899 114.083 33.0186 114.632 33.6732C115.178 34.3277 115.451 35.1789 115.451 36.2268V49.9869H124.098V40.1541L129.196 33.8463L135.991 25.6454L136.745 25.9096L137.465 42.8016C137.488 43.2037 137.535 43.6 137.6 43.9903C137.664 44.3807 137.746 44.7447 137.84 45.0793C138.427 47.1369 139.569 48.5634 141.272 49.3471C142.968 50.1337 144.744 50.2658 146.593 49.7433C147.432 49.5026 148.266 49.1181 149.091 48.5869C149.916 48.0585 150.649 47.4069 151.292 46.632L152.933 44.683V33.1683H152.936ZM116.631 18.8065C116.631 20.5529 116.085 21.9295 114.993 22.9333C113.901 23.9401 112.307 24.4391 110.211 24.4391H101.958V12.3843H110.211C112.31 12.3843 113.904 12.942 114.993 14.0544C116.085 15.1668 116.631 16.4906 116.631 18.0198V18.8065Z"/>
            <path d="M192.215 49.9899V4.13055H221.173V12.3843H200.865V22.8658H220.387V31.1196H200.865V41.7332H221.96V49.9869H192.218L192.215 49.9899Z"/>
            <path d="M226.063 49.9899V4.13055H244.015C247.158 4.13055 249.768 4.77629 251.843 6.0619C253.918 7.35045 255.468 9.00883 256.495 11.04C257.52 13.0711 258.036 15.1991 258.036 17.4269V19.0002C258.036 21.272 257.523 23.4558 256.495 25.5515C255.468 27.6473 253.918 29.3614 251.843 30.694C249.768 32.0266 247.158 32.6928 244.015 32.6928H234.71V49.9899H226.063ZM234.713 24.4391H243.164C245.086 24.4391 246.604 23.9137 247.716 22.8658C248.828 21.818 249.386 20.4649 249.386 18.8035V18.0169C249.386 16.3585 248.828 15.0025 247.716 13.9546C246.604 12.9068 245.083 12.3814 243.164 12.3814H234.713V24.4362V24.4391Z"/>
            <path d="M262.926 49.9899V4.13055H280.878C284.021 4.13055 286.631 4.77629 288.706 6.0619C290.781 7.35045 292.331 9.00883 293.358 11.04C294.385 13.0711 294.899 15.1991 294.899 17.4269V19.0002C294.899 21.272 294.385 23.4558 293.358 25.5515C292.331 27.6473 290.781 29.3614 288.706 30.694C286.631 32.0266 284.021 32.6928 280.878 32.6928H271.573V49.9899H262.926ZM271.576 24.4391H280.027C281.949 24.4391 283.467 23.9137 284.579 22.8658C285.691 21.818 286.249 20.4649 286.249 18.8035V18.0169C286.249 16.3585 285.691 15.0025 284.579 13.9546C283.467 12.9068 281.946 12.3814 280.027 12.3814H271.576V24.4362V24.4391Z"/>
            <path d="M50.5068 4.13055H41.8597V50.6679H50.5068V4.13055Z"/>
        </svg>
    </span>
</template>

<style scoped>


header {
  height: 120px;
  display: flex;
  flex-direction: column;
  gap: 1.5em;
  background-color: var(--rosewood);
  justify-content: center;
  align-items: center;
  color: var(--off-white);
}

header svg {
  height: 28px;
  fill: #FFFBF4;
}

.menuToggle{
  display: none;

  svg {
    width: 2em;
    height: auto;
  }
}

.modal-bg {
  display: none;
  transition: 200ms ease all;
}

@media (max-width: 500px) {

  header {
    gap: 1em;
    justify-content: space-around;
    padding: 2em;
  }
  
  .menuToggle {
    display: inline-block;
  }

  header:has(.navShow) .modal-bg {
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 998;
    background-color: rgba(0, 0, 0, 0.4);
  }

  .links {
    position: fixed !important;
    top: 0;
    left: 0;
    flex-direction: column;
    background-color: var(--rosewood);
    height: 100%;
    z-index: 999;
    padding: 1em;
    align-items: flex-start !important;
    transform: translateX(-110%);
  }
  .links.navShow{
    transform: translateX(0);
  }

  .active-border {
    display: none !important;
  }

  .themebtn {
    right: 0em !important;
    transform: translateX(0) !important;
  }
}

.top {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
}

.themebtn {
  position: absolute;
  top: 50%;
  right: 2em;
  width: 3em;
  height: 3em;
  background-color: var(--off-main);
  transform: translate(-50%, -50%);
  border: none;
  border-radius: 1000px;
  box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: .75em;
  cursor: pointer;
  transition: 200ms ease all;

  &:hover {
    scale: 1.05;
  }

  &:active {
    scale: 0.95;
  }

  svg {
    fill: var(--text);
  }

  > * {
    width: 100%;
  }

}


.links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2em;
  position: relative;
  transition: 200ms ease all;
  
  > * {
    color: var(--off-white);
    text-decoration: none;
    font-size: 1.1em;
    position: relative;
    text-transform: uppercase;
    transition: 200ms ease all;
    
    &::before {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      background-color: rgba(255, 251, 244, .6);
      transition: 200ms ease all;
      height: 0px;
    }
    
    &.router-link-active::before {
      height: 2px;
      background-color: #fff;
    }
  }
}

.active-border {
  position: absolute;
  bottom: 0;
  height: 2px;
  background-color: var(--off-white);
  border-radius: 8px;
  transition: all 200ms ease;
  display: block;
}

.icon-tracer {
    position: sticky;
    background-color: black;
    margin-top: 2em;
    top: 48px;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
    width: fit-content;
    max-height: 0;
    transition: 200ms ease all;
    mix-blend-mode: difference;

    svg {
        height: 0px;
        fill: #FFFBF4;
        transition: 200ms ease all;
        cursor: pointer;
    }
}

.icon-tracer.sticking {
    max-height: 300px;
    svg {
        height: 28px;
    }
}
</style>