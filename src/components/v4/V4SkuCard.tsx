function getBadge(slug, name) {
  if (slug.indexOf('bundle') >= 0) return { text: 'Best Value', cls: 'bg-green-50 text-green-600 border-green-200', icon: 'fa-bolt' };
  if (slug.indexOf('2024') >= 0 || slug.indexOf('11-pro') >= 0) return { text: 'Newest', cls: 'bg-blue-50 text-blue-600 border-blue-200', icon: 'fa-star' };
  return { text: 'Instant Delivery', cls: 'bg-green-50 text-green-600 border-green-200', icon: 'fa-bolt' };
}

function getIcon(slug) {
  if (slug.indexOf('office') >= 0) return { icon: 'fa-microsoft', bg: 'bg-orange-50 border-orange-100', color: '#d83b01' };
  if (slug.indexOf('server') >= 0 || slug.indexOf('exchange') >= 0 || slug.indexOf('sql') >= 0) return { icon: 'fa-database', bg: 'bg-purple-50 border-purple-100', color: '#5c2e91' };
  return { icon: 'fa-windows', bg: 'bg-blue-50 border-blue-100', color: '#7c3aed' };
}

export default function V4SkuCard(props) {
  var p = props.product;
  var onAdd = props.onAddToCart;
  var badge = getBadge(p.slug, p.n);
  var icon = getIcon(p.slug);
  var specs = p.specs || {};
  var tags = [specs.platform, specs.lang, specs.activation, specs.support].filter(Boolean).slice(0, 4);
  var typeName = specs.type === 'OEM' ? 'OEM' : specs.type === 'Bundle' ? 'Bundle' : 'Retail';
  var price = '$' + p.p.toFixed(2);

  return (
    <div className={'sku-card bg-white rounded-2xl border border-[#e8e8ed] p-6 transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.05)] hover:-translate-y-1 flex flex-col justify-between'}>
      <div>
        <div className='flex items-center justify-between mb-4'>
          <span className={'text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded border ' + badge.cls}>
            <i className={'fa-solid ' + badge.icon + ' mr-1'}></i> {badge.text}
          </span>
          <span className='text-xs text-[#86868b]'>{typeName}</span>
        </div>
        <div className='flex items-center space-x-3.5 mb-4'>
          <div className={'w-12 h-12 rounded-xl flex items-center justify-center border ' + icon.bg}>
            <i className={'fa-brands ' + icon.icon + ' text-2xl'} style={{color: icon.color}}></i>
          </div>
          <div>
            <h3 className='text-lg font-bold text-[#1d1d1f]'>{p.n}</h3>
            <p className='text-xs text-[#86868b]'>{specs.version || ''}</p>
          </div>
        </div>
        <p className='text-xs text-[#86868b] leading-relaxed mb-4'>{p.d}</p>
        <div className='flex flex-wrap gap-2 mb-4'>
          {tags.map(function(t, i) {
            return <span key={i} className='text-[10px] bg-[#f5f5f7] text-[#6e6e73] px-2 py-1 rounded'>{t}</span>;
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