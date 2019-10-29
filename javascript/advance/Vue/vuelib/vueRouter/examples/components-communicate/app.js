import Vue from 'vue';
import Section1 from './demo.1/section.vue';
import Section2 from './demo.2/section.vue';
import Section3 from './demo.3/section.vue';
import Section4 from './demo.4/section.vue';
import Section5 from './demo.5/section.vue';
import Section6 from './demo.6/parent.vue';
import Section7 from './demo.7/parent.vue';
import Section8 from './demo.8/parent.vue';
import Section9 from './demo.9/parent.vue';
import Section10 from './demo.10/parent.vue';
new Vue({
  name: 'initVueObj',
  components: {Section1, Section2, Section3, Section4, Section5, Section6, Section7, Section8, Section9, Section10},
  template: `
  <div>
   <Section1/>
   <Section2/>
   <Section3/>
   <Section4/>
   <Section5/>
   <Section6/>
   <Section7/>
   <Section8/>
   <Section9/>
   <Section10/>
  </div>
  `
}).$mount('#app');
