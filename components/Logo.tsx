import React from 'react';
import { View } from 'react-native';
import  { SvgXml }  from 'react-native-svg';



const Logo = () => {
    const xml = `
    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         width="100%" viewBox="0 0 784 999" enable-background="new 0 0 784 832" xml:space="preserve">
    <path fill="#000000" opacity="1.000000" stroke="none" 
        d="
    M509.233765,599.211182 
        C485.322449,625.667725 461.589081,651.807373 437.944916,678.027405 
        C405.713593,713.770203 373.550598,749.574646 341.356934,785.351440 
        C338.126526,788.941406 334.654083,792.345276 331.733215,796.170837 
        C329.818329,798.678833 328.119995,799.293152 325.049683,798.431274 
        C296.087311,790.300659 268.244720,779.364990 241.629471,765.356934 
        C202.359283,744.688416 167.356186,718.345276 137.089355,685.857727 
        C105.058777,651.477112 80.225731,612.493469 62.852596,568.780884 
        C61.548561,565.499756 62.103439,563.347351 64.411758,560.777893 
        C108.164307,512.074829 151.840225,463.302887 195.511566,414.526947 
        C229.182968,376.919861 262.824951,339.286438 296.481934,301.666443 
        C342.021423,250.764816 387.571899,199.873016 433.098236,148.959625 
        C448.309448,131.948517 463.537598,114.951096 478.562866,97.776703 
        C481.002808,94.987785 483.144867,95.937737 485.655060,96.768951 
        C528.537781,110.969009 568.318787,131.123337 604.335266,158.527084 
        C620.570862,170.880203 635.227112,184.906342 648.893433,200.020096 
        C650.185974,201.449539 650.433472,202.811172 650.428955,204.498901 
        C650.399597,215.497803 650.350464,226.496979 650.413208,237.495483 
        C650.427979,240.088531 649.831970,241.693573 647.085388,242.775253 
        C641.907166,244.814529 638.797729,249.271652 635.848083,253.773865 
        C627.833069,266.007935 623.854248,279.755676 621.567078,293.939606 
        C617.489197,319.229248 618.549683,344.317474 626.256714,368.919647 
        C629.265686,378.524841 633.278381,387.642761 640.042297,395.281586 
        C641.467896,396.891602 642.982727,399.000031 644.844788,399.540161 
        C650.930603,401.305359 650.572083,405.724396 650.465637,410.540863 
        C650.259460,419.868927 650.325134,429.205292 650.427673,438.536530 
        C650.458984,441.381012 649.673889,443.688934 647.766602,445.792603 
        C624.497375,471.456970 601.239197,497.131592 578.021423,522.842468 
        C555.139038,548.181885 532.306091,573.565796 509.233765,599.211182 
    M421.766144,634.271240 
        C440.506439,613.495300 459.245880,592.718628 477.987183,571.943604 
        C514.247925,531.748108 550.514771,491.558167 586.766846,451.354828 
        C594.663025,442.598053 602.507202,433.794403 610.477905,424.897827 
        C589.120605,399.990936 581.838074,370.230194 578.406799,338.578247 
        C444.169403,453.088593 291.837280,537.807434 136.962799,618.425781 
        C137.422485,621.186462 139.113495,622.900085 140.448318,624.739868 
        C157.056137,647.629822 176.079575,668.296387 197.815613,686.406799 
        C231.037552,714.087280 268.188019,734.885681 308.730347,749.831421 
        C313.826508,751.710083 316.631927,750.745850 320.170319,746.798218 
        C353.742859,709.342163 387.546326,672.093079 421.766144,634.271240 
    M309.660400,349.152008 
        C276.478577,386.265564 243.309998,423.390961 210.111206,460.489288 
        C177.911682,496.470886 145.705627,532.446716 113.413818,568.345398 
        C111.048553,570.974854 109.639427,573.108276 111.810242,576.580383 
        C113.832840,579.815369 115.346130,583.370728 117.057106,586.798218 
        C120.490868,593.676880 120.479027,593.671997 127.320496,590.176697 
        C181.463165,562.515259 234.987701,533.721924 287.636139,503.294647 
        C351.560242,466.350830 414.074860,427.216583 473.888275,383.886230 
        C508.574890,358.758331 542.144348,332.231903 573.440369,302.897797 
        C578.041443,298.585114 579.831177,293.788116 580.796143,287.824524 
        C584.615112,264.221527 591.711792,241.825638 607.206238,222.966904 
        C609.693115,219.940002 609.306030,218.103226 606.667297,215.508774 
        C594.639038,203.682236 581.776245,192.899933 567.925232,183.265106 
        C545.816956,167.886429 522.259277,155.228668 497.280457,145.186447 
        C495.052856,144.290878 493.420776,143.615662 491.252167,146.050598 
        C463.676849,177.012314 435.897980,207.792542 408.256683,238.695679 
        C375.511719,275.304779 342.850159,311.988464 309.660400,349.152008 
    z"/>
    </svg>`
  return (
    <View>
      <SvgXml xml={xml} width={50} height={50}></SvgXml>
    </View>
  );
};

export default Logo;
