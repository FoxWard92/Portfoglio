<script>
  import HeaderCaption from "$lib/components/HeaderCaption.svelte";
  import DescribeCaption from "$lib/components/DescribeCaption.svelte";
  import ListCaption from "$lib/components/ListCaption.svelte";
</script>

<HeaderCaption
  logo="/images/foto1.jpg"
  subtitle="Nickolas Trovato"
  title="EDUCAZIONE CIVICA"
  url1="/images/foto1.jpg"
/>

<ListCaption
  titles={["STORIA","ITALIANO"]}
  subtitle="ANNO 2021/2022"
  info = " 1ITTA"
  matrix={[[
    { name: "MA", pathlink: "/",pathimg : "/images/foto1.jpg"},
    { name: "Prodotti", pathlink: "/prodotti",pathimg : "/images/foto1.jpg"},
    { name: "Contatti", pathlink: "/contatti" ,pathimg : "/images/foto1.jpg"},
    { name: "Home", pathlink: "/",pathimg : "/images/foto1.jpg"},
    { name: "Prodotti", pathlink: "/prodotti",pathimg : "/images/foto1.jpg"},
    { name: "Home", pathlink: "/",pathimg : "/images/foto1.jpg"},
    { name: "Prodotti", pathlink: "/prodotti",pathimg : "/images/foto1.jpg"},
    { name: "Home", pathlink: "/",pathimg : "/images/foto1.jpg"},
    { name: "Prodotti", pathlink: "/prodotti",pathimg : "/images/foto1.jpg"},
  ],[
    { name: "M", pathlink: "/",pathimg : "/images/foto1.jpg"},
    { name: "Prodotti", pathlink: "/prodotti",pathimg : "/images/foto1.jpg"},
    { name: "Contatti", pathlink: "/contatti" ,pathimg : "/images/foto1.jpg"},
    { name: "Home", pathlink: "/",pathimg : "/images/foto1.jpg"},
    { name: "Prodotti", pathlink: "/prodotti",pathimg : "/images/foto1.jpg"},
    { name: "Home", pathlink: "/",pathimg : "/images/foto1.jpg"}
  ]
  ]}
/>

<DescribeCaption txt="ciao" url="/images/foto1.jpg" />

