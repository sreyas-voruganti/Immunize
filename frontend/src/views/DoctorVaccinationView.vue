<template>
  <div class="my-4">
    <iframe
      ref="identityFrame"
      id="identity"
      frameborder="0"
      src="https://identity.deso.org/embed"
      style="
        height: 100vh;
        width: 100vw;
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
      "
    ></iframe>
    <h1 class="text-2xl font-medium text-center mb-1" style="color: #ffda59">
      Create a Vaccination Record
    </h1>
    <div class="ml-5 display-flex">
      <div class="mt-3">
        <label>Patient Name </label>
        <input
          type="text"
          placeholder="Patient Name"
          class="border-2 rounded-xl p-2 w-11/12"
          v-model="vaccination.patientName"
        />
      </div>
      <div class="mt-3">
        <label>Vaccine </label>
        <input
          type="text"
          placeholder="Vaccine"
          class="border-2 rounded-xl p-2 w-11/12"
          v-model="vaccination.vaccine"
        />
      </div>
      <div class="mt-3">
        <label>Product Name/Manufacturer Lot Number</label>
        <input
          type="text"
          placeholder="Product Name/Manufacturer Lot Number"
          class="border-2 rounded-xl p-2 w-11/12"
          v-model="vaccination.product"
        />
      </div>
      <div class="mt-3">
        <label>Date</label>
        <input
          type="date"
          class="border-2 rounded-xl p-2 w-11/12"
          v-model="vaccination.date"
        />
      </div>
      <div class="mt-3">
        <label>Location</label>
        <input
          type="text"
          placeholder="Vaccination Location"
          class="border-2 rounded-xl p-2 w-11/12"
          v-model="vaccination.location"
        />
      </div>
      <div class="mt-3">
        <label>Physician</label>
        <input
          type="text"
          placeholder="Physician"
          class="border-2 rounded-xl p-2 w-11/12"
          v-model="vaccination.physician"
        />
      </div>
      <button
        class="px-3 py-2 mt-7 rounded-full w-11/12 text-xl"
        style="background-color: #ffda59; color: #6f4800"
        @click="createPost"
      >
        Sign and Create Vaccination
      </button>
      <!-- <button @click="init">INIT</button> -->
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "DoctorVaccinationView",
  data: () => ({
    vaccination: {
      patientName: "",
      vaccine: "",
      product: "",
      date: "",
      location: "",
      physician: "",
    },
    userD: null,
    sentMessageHandlers: {},
  }),
  methods: {
    sendMessage(req, handler) {
      this.$refs.identityFrame.contentWindow.postMessage(req, "*");
      this.sentMessageHandlers[req.id] = handler;
    },
    init() {
      const h = 1000;
      const w = 800;
      const y = window.outerHeight / 2 + window.screenY - h / 2;
      const x = window.outerWidth / 2 + window.screenX - w / 2;
      this.win = window.open(
        "https://identity.deso.org/log-in",
        null,
        `toolbar=no, width=${w}, height=${h}, top=${y}, left=${x}`
      );
    },
    handleMessage(event) {
      if (event.data.service) {
        console.log(event.data);
      }

      if (event.data.method === "initialize") {
        event.source.postMessage(
          // respond to initialize message
          {
            id: event.data.id,
            service: "identity",
            payload: {},
          },
          "https://identity.deso.org"
        );
      } else if (event.data.method == "login") {
        console.log(
          event.data.payload.users[Object.keys(event.data.payload.users)[0]]
        );
        localStorage.setItem(
          "userD",
          JSON.stringify(
            event.data.payload.users[Object.keys(event.data.payload.users)[0]]
          )
        );
        this.userD =
          event.data.payload.users[Object.keys(event.data.payload.users)[0]];
      }

      if (event.data.id && this.sentMessageHandlers[event.data.id]) {
        this.sentMessageHandlers[event.data.id](event.data);
      }
    },
    uuid() {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == "x" ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        }
      );
    },
    async createPost() {
      const { data: unverifiedPost } = await axios.post(
        "https://node.deso.org/api/v0/submit-post",
        {
          UpdaterPublicKeyBase58Check:
            "BC1YLjFkp38w85VhMMAkwyMx8BAQ9Y7zUKtvzLzrEyf7orrWruG4ccY",
          BodyObj: {
            Body: JSON.stringify({
              id: this.uuid(),
              patientName: this.vaccination.patientName,
              vaccine: this.vaccination.vaccine,
              product: this.vaccination.product,
              date: this.vaccination.date,
              location: this.vaccination.location,
              physician: this.vaccination.physician,
              physicianId: localStorage.getItem("user_id"),
            }),
          },
          IsHidden: true,
          MinFeeRateNanosPerKB: 1000,
        }
      );

      // sign post
      this.sendMessage(
        {
          id: this.uuid(),
          service: "identity",
          method: "sign",
          payload: {
            accessLevel: this.userD.accessLevel,
            accessLevelHmac: this.userD.accessLevelHmac,
            encryptedSeedHex: this.userD.encryptedSeedHex,
            transactionHex: unverifiedPost.TransactionHex,
          },
        },
        async (res) => {
          const { data: signedTransaction } = await axios.post(
            "https://node.deso.org/api/v0/submit-transaction",
            {
              TransactionHex: res.payload.signedTransactionHex,
            }
          );
          console.log(signedTransaction);
          this.$router.push("/doctor_profile");
        }
      );
    },
  },
  created() {
    window.addEventListener("message", this.handleMessage);
    if (localStorage.getItem("userD")) {
      this.userD = JSON.parse(localStorage.getItem("userD"));
    }
  },
};
</script>
