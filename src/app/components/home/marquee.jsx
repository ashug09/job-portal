import React from "react";
import Marquee from "react-fast-marquee";
import apple from "../../assets/images/apple.png";
import facebook from "../../assets/images/facebook.png";
import microsoft from "../../assets/images/microsoft.png";
import twitter from "../../assets/images/twitter.png";
import stripe from "../../assets/images/stripe.png";
import marriott from "../../assets/images/marriott.png";
import nike from "../../assets/images/nike.png";
import telegram from "../../assets/images/telegram.png";
import { IconBrandWindows, IconBrandGoogleFilled } from "@tabler/icons-react";
import Image from "next/image";
export default function MarqueeIcons() {
  return (
    <div>
      <h1 className="text-xl mx-5 my-2 font-bold">
        Top Companies Hire From Us....
      </h1>
      <Marquee className="my-4">
        <Image src={apple} height={40} width={40} className="mx-4 my-2" />
        <Image src={facebook} height={40} width={40} className="mx-4 my-2" />
        <Image src={twitter} height={40} width={40} className="mx-4 my-2" />
        <Image src={telegram} height={40} width={40} className="mx-4 my-2" />
        <Image src={stripe} height={40} width={40} className="mx-4 my-2" />
        <Image src={nike} height={40} width={40} className="mx-4 my-2" />
        <Image src={marriott} height={40} width={40} className="mx-4 my-2" />
        <Image src={microsoft} height={40} width={40} className="mx-4 my-2" />
      </Marquee>
    </div>
  );
}
