import { LANDING_URL } from "@/lib/site";

export function Hero() {
  return (
    <section className="flex flex-col border-b border-dark-gray lg:flex-row">
      <div className="flex flex-1 flex-col">
        <div className="flex h-[70px] items-center gap-4 border-b border-dark-gray px-5 font-body text-base md:h-[100px] md:px-[60px] md:text-[18px]">
          <a href={LANDING_URL} className="text-concrete hover:text-black">
            Home
          </a>
          <span className="size-[10px] shrink-0 bg-black" aria-hidden />
          <span className="text-black">Blog</span>
        </div>

        <div className="flex flex-1 items-center border-b border-dark-gray px-5 py-10 md:px-[60px] md:py-[60px]">
          <h1 className="font-mono text-[56px] font-medium uppercase leading-none text-black sm:text-[80px] xl:text-[100px] 2xl:text-[120px]">
            Blog<span className="blink-cursor text-red">_</span>
          </h1>
        </div>

        <div className="flex flex-col justify-center gap-4 px-5 py-8 md:h-[138px] md:px-[60px] md:py-[40px]">
          <span className="size-[10px] shrink-0 bg-black" aria-hidden />
          <p className="font-body text-lg leading-[1.4] text-black md:text-[20px]">
            News, Insights and Press Release
          </p>
        </div>
      </div>

      <div className="relative h-[220px] shrink-0 overflow-hidden border-t border-dark-gray bg-pink sm:h-[300px] lg:h-auto lg:w-1/2 lg:border-t-0 lg:border-l">
        <img
          src="/images/hero-duck.svg"
          alt="Pixel-art RedDuck mascot"
          className="size-full object-cover"
        />
      </div>
    </section>
  );
}

export default Hero;
