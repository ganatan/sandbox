let toto = [
  { name: '1111111' },
  { name: '2222222' },
];


toto.map((item) => {
  item.name = item.name + 'xxxx';
  console.log('00000000001:' + JSON.stringify(item));
});