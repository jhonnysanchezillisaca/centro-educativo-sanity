import CoverImage from "./cover-image";

export default function Intro({ title, subtitle, mainImage }) {
  return (
    <section >
      <div className="flex-col md:flex-row flex items-center md:justify-between mt-8 mb-16 md:mb-12">
        <h1 className="text-7xl md:text-8xl font-bold tracking-tighter text-center md:text-left leading-tight md:pr-8">
          {title}
        </h1>
        <h4 className="text-center md:text-left text-lg mt-5 md:pl-8">
          {subtitle}
        </h4>
      </div>
      <div className="mb-8 md:mb-16">
        <CoverImage title={title} image={mainImage} />
      </div>
    </section>
  );
}
