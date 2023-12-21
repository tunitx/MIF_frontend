const TopBarSection = () => {
  return (
    <div className="absolute top-[-0.75rem] left-[calc(50%_-_197.5px)] bg-seashell flex flex-col items-start justify-start p-[0.63rem] text-center text-[1.06rem] text-black font-default-bold-body">
      <div className="relative w-[23.44rem] h-[2.94rem] overflow-hidden shrink-0">
        <img
          className="absolute top-[-0.12rem] left-[calc(50%_-_81.5px)] w-[0rem] h-[0rem] object-cover"
          alt=""
          src="/notch@2x.png"
        />
        <div className="absolute top-[0.88rem] left-[calc(50%_-_162.5px)] w-[3.38rem] h-[1.31rem]">
          <div className="absolute top-[0rem] left-[calc(50%_-_27px)] rounded-3xl w-[3.38rem] h-[1.31rem]">
            <div className="absolute top-[0.06rem] left-[0rem] tracking-[-0.41px] leading-[1.38rem] font-semibold inline-block w-[3.38rem] h-[1.25rem]">
              9:41
            </div>
          </div>
        </div>
        <div className="absolute top-[1.19rem] left-[calc(50%_+_96.5px)] w-[4.84rem] h-[0.81rem]">
          <img
            className="absolute top-[0rem] left-[calc(50%_+_11.3px)] w-[1.71rem] h-[0.81rem] object-cover"
            alt=""
            src="/battery@2x.png"
          />
          <img
            className="relative w-[1.06rem] h-[0.75rem] object-cover"
            alt=""
            src="/wifi@2x.png"
          />
          <img
            className="absolute top-[0.06rem] left-[calc(50%_-_38.7px)] w-[1.13rem] h-[0.75rem] object-cover"
            alt=""
            src="/icon--mobile-signal@2x.png"
          />
        </div>
      </div>
    </div>
  );
};

export default TopBarSection;
