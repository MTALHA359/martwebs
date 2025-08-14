import Tilt from 'react-parallax-tilt';

export default function ProductPreviewCard({ product }) {
  return (
    <Tilt glareEnable={true} glareMaxOpacity={0.5} className="max-w-sm">
      <div className="bg-[#1a1a1a] p-4 rounded-xl shadow-glow text-white">
        <img src={product.image} className="w-full rounded mb-2" />
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p>${product.price}</p>
      </div>
    </Tilt>
  );
}
