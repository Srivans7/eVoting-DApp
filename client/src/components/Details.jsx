import React from "react";

const Details = ({Heading, data}) =>
{
    return (
        <div className="py-[15px] text-white font-epilogue flex-1 w-full flex flex-col border-[1px] rounded-[10px] font-black text-[18px] leading-[22px]">
            {Heading}
        <div className="pt-[15px] outline-none bg-transparent font-epilogue text-white font-medium text-[16px] rounded-[10px] ">
            {data}
        </div>
    </div>);
}

export default Details;