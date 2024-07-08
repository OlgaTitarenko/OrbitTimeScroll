<script setup >
  import { onMounted, onUnmounted, ref, watch } from 'vue'

  const date = new Date();
  const formatData = `${date.getMonth()+1}/${date.getDate()}/${date.getFullYear()}`;

  const orbit = ref({data: formatData});
  const time = ref('Today');
  const scrollDiv = ref(null);
  const firstOrbit = ref(0);
  const VISIBLEORBIT = 7;
  const getData = async () => {
    await fetch(`https://xsrr-l2ye-dpbj.f2.xano.io/api:oUvfVMO5/receive_week?start_date=${orbit.value.data}`)
      .then((response) => {
        return response.json();
      })
      .then(data => orbit.value.orbit = data);
      
  };
  const handleScroll = () => {
    console.log('scroll-q');
  if (scrollDiv.value) {
    const scrollTop = scrollDiv.value.scrollTop;
    const scrollHeight = scrollDiv.value.scrollHeight;
    const clientHeight = scrollDiv.value.clientHeight;

    console.log(`Scroll Top: ${scrollTop}`);
    console.log(`Scroll Height: ${scrollHeight}`);
    console.log(`Client Height: ${clientHeight}`);

    // Example condition: Check if scrolled to the bottom
    if (scrollTop + clientHeight >= scrollHeight) {
      console.log('Scrolled to the bottom');
    }
  }
};

  watch(
    [orbit.value.data],
    () => {
      getData();
    },
    { immediate: true },
  );

  onMounted(() => {
    if (scrollDiv.value) {
      console.log(scrollDiv.value);
      scrollDiv.value.addEventListener('scroll', handleScroll);
    }
  });

    onUnmounted(() => {
      if (scrollDiv.value) {
        scrollDiv.value.removeEventListener('scroll', handleScroll);

      }
    });

//   const transform = (orbitKey, numItems, item) => {
//     const deg = -180 / (numItems + 1);
//     const degRotate = item * deg;
//     if (orbitKey === firstOrbit.value && degRotate == -90) {
//       return `transform: rotate(${degRotate - 8}deg) translate(${50 - (orbitKey * 7.5)}vw) rotate(${-degRotate + 6}deg)`
//     }
//     return `transform: rotate(${degRotate}deg) translate(${50 - (orbitKey * 7.5)}vw) rotate(${-degRotate}deg)`
//  }

</script>

<template>

  <div class="orbit">
    <ul class="orbit-wrap" ref="scrollDiv">
      <!-- <li v-for="(orbit, Okey) in orbit.orbit" :key="Okey">
        <ul :class="['ring-' + (Okey-firstOrbit), (Okey < VISIBLEORBIT && Okey >= firstOrbit) ? '' : 'disable' ]">
          <li v-if="Okey == firstOrbit" class="text" ><span>{{ time }}</span></li>  
          <li v-for="(item, key) in orbit.array" :key="key">
            <div :style="transform(Okey, orbit.array.length, key+1 )">
              <img class="orbit-icon" :src="item.img" :alt="item.name" />
            </div>
          </li>
        </ul>
      </li> -->
    </ul>
  </div>
</template>


<style  lang="scss">

$orbitItemSize: 1.5em;
$lastRing: 6;

* {
  box-sizing: border-box;
}

html {
  font-size: 100%;
}

.orbit {
  background: #0A0A0A;
  float: left;
  width: 100%;
  min-width: 100vw;
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  margin-top: 10px;
}

.orbit-icon {
  width: $orbitItemSize;
  height: $orbitItemSize;
  border-radius: 50%;
  display: block;
  object-fit: cover;
}

.orbit-wrap {
  width: 100%;
  height: 160vh;
  min-height: 60%;
  list-style: none;
  font-size: 1.3em;
  overflow-y: scroll;
  > li {
    position: absolute;
    padding-top: 50%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

ul[class^=ring] {
  @extend %ring;
  transition: all 300ms ease-in-out;
  li {
    @extend %orbiting-object;
    transition: all 300ms ease-in-out;
  }
}
.disable {
  display: none;
}

// Render rings
@for $i from 0 through $lastRing {  
  .ring-#{$i} {
    // decrease each ring in size
    width: 100vw - ($i * 15);
    height: 100vw - ($i * 15);
  }
  
}


%ring {
  position: relative;
  padding: 0;
  list-style: none;
  box-sizing: content-box;
  
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 50%; 
    padding: 1px; 
    background: linear-gradient(180deg, #FFFFFF -6.6%, rgba(255, 255, 255, 0) 46.31%); 
    -webkit-mask: 
      linear-gradient(#fff 0 0) content-box, 
      linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
            mask-composite: exclude; 
  }
  .text {
    color: #929292;
    text-align: center;
    display: flex;
    justify-content: center;
    margin-top: -10px;
    transform: rotate(-90deg) translate(50vw) rotate(90deg);

    span {
      font-size: 14px;
      background-color: #0A0A0A;
      padding: 0 4px;
    }
  }
}

%orbiting-object {
  display: block;
  position: absolute;
  top: 50%;
  left: 50%;
  width: $orbitItemSize;
  height: $orbitItemSize;
  margin: -$orbitItemSize / 2;
}

</style>

