<template>
  <div v-if="!loaded" class="loading">
    Loading, please wait!
  </div>
  <component v-else :is="config.layout.component" :config="config.layout"></component>
</template>

<script>
import fs from 'fs';
import Vue from 'vue';

export default {
  name: 'app',
  data() {
    return {
      loaded: false,
      config: {},
      plugins: {}
    };
  },
  mounted() {
    fs.readFile('config.json', 'utf8', (err, data) => {
      if(err) throw err;
      this.config = JSON.parse(data);
      this.loadPlugins();
      this.connect();
      this.loaded = true;
    });
  },
  methods: {
    connect() {
      const mpdConfig = this.config.mpd;
      this.$mpc.connectTCP(mpdConfig.host, mpdConfig.port);
      this.$mpc.connection.password(mpdConfig.password);
    },
    loadPlugins() {
      this.config.plugins.forEach(name => {
        try {
          this.plugins[name] = require(name);
          Vue.use(this.plugins[name]);
        } catch(e) {
          console.error(`Failed to load plugin: ${name}\n\n${e.stack}`);
        }
      });
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

#app * {
  box-sizing: border-box;
}

.loading {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}
</style>
