import ProductImage from "../ProductImage";

function getBadge(slug: string, name: string) {
  if (slug.indexOf('bundle') >= 0) return { text: 'Best Value', cls: 'bg-green-50 text-green-600 border-green-200', icon: 'fa-bolt' };
  if (slug.indexOf('2024') >= 0 || slug.indexOf('11-pro') >= 0) return { text: 'Newest', cls: 'bg-blue-50 text-blue-600 border-blue-200', icon: 'fa-star' };
  return { text: 'Instant Delivery', cls: 'bg-green-50 text-green-600 border-green-200', icon: 'fa-bolt' };
}

export default function V4SkuCard(props: any) {
  var p = props.product;
  var onAdd = props.onAddToCart;
  var badge = getBadge(p.slug, p.n);
  var specs = p.specs || {};
  var tags = [specs.platform, specs.lang, specs.activation, specs.support].filter(Boolean).slice(0, 4);
  var typeName = specs.type === 'OEM' ? 'OEM' : specs.type === 'Bundle' ? 'Bundle' : 'Retail';
  var price = '$' + p.p.toFixed(2);

  return (
    <div className={'sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between'}>
      <div>
        <div className='flex items-center justify-between mb-4'>
          <span className={'text-xs font-bold tracking-wide uppercase px-2.5 py-1 rounded border ' + badge.cls}>
            <i className={'fa-solid ' + badge.icon + ' mr-1'}></i> {badge.text}
          </span>
          <span className='text-xs text-[#86868b]'>{typeName}</span>
        </div>
        <ProductImage slug={p.slug} name={p.n} />
        <h3 className='text-lg font-bold text-[#1d1d1f] mb-1'>{p.n}</h3>
        <p className='text-xs text-[#86868b] mb-4'>{specs.version || ''}</p>
        <p className='text-xs text-[#86868b] leading-relaxed mb-4'>{p.d}</p>
        <div className='flex flex-wrap gap-2 mb-4'>
          {tags.map(function(t, i) {
            return <span key={i} className='text-xs bg-[#f5f5f7] text-[#6e6e73] px-2 py-1 rounded'>{t}</span>;
          })}
        </div>
      </div>
      <div className='flex items-center justify-between pt-4 border-t border-[#f5f5f7]'>
        <span className='text-xl font-bold text-[#1d1d1f]'>{price}</span>
        <button onClick={function() { onAdd(p); }}
                className='bg-[#7c3aed] hover:bg-[#6d28d9] text-white text-xs font-medium px-5 py-2 rounded-full transition'>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
