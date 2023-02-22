import { Button } from "flowbite-react";
import React from "react";

type Props = {};

const ButtonActions = (props: Props) => {
  return (
    <div>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <div>
          <Button outline={true} gradientDuoTone="purpleToBlue">
            Fetch Wallet Tokens
          </Button>
        </div>
        <div>
          <Button outline={true} gradientDuoTone="cyanToBlue">
            Air Drop SOL
          </Button>
        </div>
        {/* 
        <div>
          <Button outline={true} gradientDuoTone="greenToBlue">
            Green to Blue
          </Button>
        </div>
        <div>
          <Button outline={true} gradientDuoTone="purpleToPink">
            Purple to Pink
          </Button>
        </div>
        <div>
          <Button outline={true} gradientDuoTone="pinkToOrange">
            Pink to Orange
          </Button>
        </div>
        <div>
          <Button outline={true} gradientDuoTone="tealToLime">
            Teal to Lime
          </Button>
        </div>
        <div>
          <Button outline={true} gradientDuoTone="redToYellow">
            Red to Yellow
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default ButtonActions;
