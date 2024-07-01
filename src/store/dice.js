import { Blockfrost, Lucid } from "lucid-cardano";
import { RNG } from "rng-ts-lib";
import { create } from "zustand";

const getRandomNumber = () => Math.floor(Math.random() * 6) + 1;

const rngInstance = new RNG({
  blockfrostApiKey: "preprodJS4XP8SQVx5WWpsfMU7dfaOdCy9TTloQ",
  network: 0,
  ogmiosURL:
    "wss://dmtr_ogmios12puxy5twwv64z6t6wejkkme3da64yvteg9nsmmcrgn.preprod-v6.ogmios-m1.demeter.run",
  oracleCBOR:
    "59025e010000222323374a90001bb1498c8c8cccc00401401000c0094cc005220101020013263357389201144e616d654572726f723a2076616c696461746f7200498c8c8c8894ccd5cd19b8f002488101020011003133004002001222232498c8c94ccd5cd19199100119199119b8f0023323230010012253335573e002266e2d200000515333573460066ae840044d5d08008998010011aba2001371e00400264646eb8ccc8c0040048894ccd55cf800899319ab9c49010a496e6465784572726f720049854ccd5cd19b87002480004d5d0800899980180199b8100248008d5d1000a40006aae78dd500099299800a4501000013263357389201104e616d654572726f723a20646174756d00498004004c8c8cc8c8c004004894ccd55cf8008a5eb104cd5d018019aba1001330020023574400246eb8004dd6199918008009112999aab9f001132633573892010a496e6465784572726f720049854ccd5cd19b87002480004d5d0800899980180199b8100248008d5d1000a40206aae78dd50009919199918008009112999aab9f00113263357389210a496e6465784572726f720049854ccd5cd19b87002480004d5d0800899980180199b8100248008d5d1000a40006aae78dd500099299800a4501010013263357389201124e616d654572726f723a20636f6e746578740049800400400400400400440044c98cd5ce192481165075626c6973686572205369676e204d697373696e6700001498004ccc888894ccd5cd19b8f00248810101001100315333573466e3c00922010103001100415333573466e3c0092201010000110051330060020010040030020012200101",
  rngAPIURL: "http://localhost:7000",
  rngCBOR:
    "59025b010000222323374a90001bb1498c8c8cccc00401401000c0094cc005220101020013263357389201144e616d654572726f723a2076616c696461746f7200498c8c8c8894ccd5cd19b8f002488101020011003133004002001222232498c8c94ccd5cd19199119b8f0023323230010012253335573e002266e2d200000515333573460066ae840044d5d08008998010011aba2001371e00400264646eb8ccc8c0040048894ccd55cf800899319ab9c4910a496e6465784572726f720049854ccd5cd19b87002480004d5d0800899980180199b8100248008d5d1000a40006aae78dd500099299800a4501000013263357389201104e616d654572726f723a20646174756d00498004004c8c8cc8c8c004004894ccd55cf8008a5eb104cd5d018019aba1001330020023574400246eb8004dd6199918008009112999aab9f001132633573892010a496e6465784572726f720049854ccd5cd19b87002480004d5d0800899980180199b8100248008d5d1000a40206aae78dd50009919199918008009112999aab9f00113263357389210a496e6465784572726f720049854ccd5cd19b87002480004d5d0800899980180199b8100248008d5d1000a40006aae78dd500099299800a4501010013263357389201124e616d654572726f723a20636f6e746578740049800400400400440044c98cd5ce1924811b496e69746961746f72207369676e6174757265206d697373696e6700001498004ccc888894ccd5cd19b8f00248810101001100315333573466e3c00922010103001100415333573466e3c0092201010000110051330060020010040030020012200101",
  walletSeed:
    "wood bench lock genuine relief coral guard reunion follow radio jewel cereal actual erosion recall",
  rngOutputLen: 1,
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const useDiceStore = create((set) => ({
  displayed_number: getRandomNumber(),
  final_number: null,

  rollingTx: null,

  rollDice: async () => {
    const lucid = await Lucid.new(
      new Blockfrost(
        "https://cardano-preprod.blockfrost.io/api/v0",
        "preprodJS4XP8SQVx5WWpsfMU7dfaOdCy9TTloQ"
      ),
      "Preprod"
    );

    set({ status: "ROLLING" });

    const interval = setInterval(() => {
      const randomNum = getRandomNumber();
      set({ displayed_number: randomNum });
    }, 100);

    // Initiating the RNG ID to the RNG contract

    const { data: rngInitData } = await rngInstance.init();

    console.log(rngInitData);

    set({ rollingTx: rngInitData.txHash });

    await lucid.awaitTx(rngInitData.txHash);

    await sleep(30 * 1000);

    if (!rngInitData) return;

    const [utxo] = await lucid.utxosAtWithUnit(
      "addr_test1wqa3uhsdlg04w3eu8tqylngsrtfse6n05sv7e23gmfp0x9ct30h9r",
      "d83c09e89208a85fb390c771bd74e7809dc2ad5399aeb95d20c1904944494345"
    );

    const { data: oracleUpdateData } = await rngInstance.oracle.update({
      currUpdatedOracleDIDTx: utxo.txHash,
      initRNGTx: rngInitData.txHash,
      oracleDIDUnit:
        "d83c09e89208a85fb390c771bd74e7809dc2ad5399aeb95d20c1904944494345",
    });

    set((state) => ({
      final_number: (parseInt(oracleUpdateData.rngOutput) % 6) + 1,
    }));

    clearInterval(interval);

    set({ rollingTx: null });

    set({ displayed_number: (parseInt(oracleUpdateData.rngOutput) % 6) + 1 });
  },
  selected_number: null,

  setDisplayedNumber: (val) => set({ displayed_number: val }),
  setFinalNumber: (val) => set({ final_number: val }),

  setSelectedNumber: (val) => set({ selected_number: val }),
  setStatus: (val) => set({ status: val }),

  status: "DEFAULT",
}));

export default useDiceStore;
