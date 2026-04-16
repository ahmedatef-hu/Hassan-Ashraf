const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function updateRealData() {
  try {
    console.log('🔄 Starting data update...');

    // Delete existing data
    console.log('🗑️  Deleting old data...');
    await supabase.from('bookings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('services').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('branches').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('patients').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert Real Branches
    console.log('📍 Inserting branches...');
    const { data: branches, error: branchError } = await supabase.from('branches').insert([
      {
        name: 'فرع فيصل',
        address: 'تقسيم عمرو بن العاص الثاني بجوار سور وزارة خلف الإدارة التعليمية الجديدة، فيصل',
        phone_numbers: ['+201000000000'],
        state: 'القاهرة',
        working_days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
        is_active: true
      },
      {
        name: 'فرع الشيخ زايد',
        address: 'مول ريتزي بلازا، الدور الثالث، عيادة 303، الشيخ زايد',
        phone_numbers: ['+201000000000'],
        state: 'الجيزة',
        working_days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
        is_active: true
      },
      {
        name: 'فرع التجمع الخامس',
        address: 'Ozone Medical Center، النرجس، عيادة B226، الدور الثاني، مبنى B، التجمع الخامس',
        phone_numbers: ['+201000000000'],
        state: 'القاهرة',
        working_days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
        is_active: true
      },
      {
        name: 'فرع مدينة نصر',
        address: '4 عبد الحكيم الرفاعي، متفرع من عباس العقاد، مدينة نصر',
        phone_numbers: ['+201000000000'],
        state: 'القاهرة',
        working_days: ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس'],
        is_active: true
      }
    ]).select();

    if (branchError) throw branchError;
    console.log(`✅ Inserted ${branches.length} branches`);

    // Insert Real Services
    console.log('💆 Inserting services...');
    const services = [
      // جلسات تنظيف البشرة
      { name: 'تنظيف البشرة العادي', description: 'جلسة تنظيف بشرة أساسية مناسبة لجميع أنواع البشرة', price: 650, category: 'cleaning', duration_minutes: 60, is_active: true },
      { name: 'تنظيف فيشيال', description: 'جلسة تنظيف بشرة متقدمة مع نضارة وتفتيح', price: 900, category: 'cleaning', duration_minutes: 75, is_active: true },
      { name: 'تنظيف هيدرافيشيال', description: 'جلسة تنظيف عميق بتقنية الهيدرا مع ترطيب مكثف', price: 1200, category: 'cleaning', duration_minutes: 90, is_active: true },
      { name: 'تنظيف الترافيشيال', description: 'جلسة تنظيف متقدمة بمنتجات طبيعية 100%', price: 1800, category: 'cleaning', duration_minutes: 90, is_active: true },
      { name: 'تنظيف جولد', description: 'جلسة تنظيف فاخرة بمنتجات الذهب الطبيعية', price: 2000, category: 'cleaning', duration_minutes: 90, is_active: true },
      { name: 'تنظيف فيشيال جولد', description: 'جلسة تنظيف فيشيال مع منتجات الذهب الطبيعية', price: 2500, category: 'cleaning', duration_minutes: 105, is_active: true },
      { name: 'تنظيف الترا جولد', description: 'أعلى درجات التنظيف والنضارة بمنتجات طبيعية فاخرة', price: 3000, category: 'cleaning', duration_minutes: 120, is_active: true },
      
      // جلسات درما بن
      { name: 'جلسة درما بن للنضارة', description: 'جلسة درما بن لتحفيز الكولاجين والنضارة', price: 650, category: 'skin_treatment', duration_minutes: 60, is_active: true },
      { name: 'جلسة درما بن للحبوب', description: 'علاج الحبوب وآثارها (8-10 جلسات)', price: 850, category: 'skin_treatment', duration_minutes: 60, is_active: true },
      { name: 'جلسة درما خلايا جذعية', description: 'علاج شامل للحبوب والمسام والتصبغات (4-6 جلسات)', price: 1500, category: 'skin_treatment', duration_minutes: 75, is_active: true },
      
      // جلسات التقشير
      { name: 'تقشير بارد (كولد بيلنج)', description: 'جلسة تقشير بارد لتفتيح البشرة', price: 1000, category: 'skin_treatment', duration_minutes: 45, is_active: true },
      { name: 'تقشير وايتننج', description: 'تقشير متقدم للتفتيح العميق', price: 1500, category: 'skin_treatment', duration_minutes: 60, is_active: true },
      
      // جلسات جروث المميزة
      { name: 'جلسة جروث', description: 'علاج متقدم للحبوب والتصبغات والمسام', price: 2000, category: 'skin_treatment', duration_minutes: 75, is_active: true },
      { name: 'جلسة جروث بيل', description: 'علاج شامل للحبوب والآثار والمسام والتصبغات والهالات', price: 2500, category: 'skin_treatment', duration_minutes: 90, is_active: true },
      { name: 'جلسة درما جروث', description: 'جلسة جروث مع درما بن لنتائج أقوى', price: 3000, category: 'skin_treatment', duration_minutes: 90, is_active: true },
      { name: 'جلسة الترا جروث بيل', description: 'أقوى جلسة علاجية شاملة لجميع مشاكل البشرة', price: 3600, category: 'skin_treatment', duration_minutes: 105, is_active: true },
      
      // جلسات إضافية
      { name: 'جلسة اكسوزوم', description: 'جلسة متقدمة لتجديد البشرة', price: 3000, category: 'skin_treatment', duration_minutes: 60, is_active: true },
      { name: 'جلسة اكسجينو', description: 'جلسة أكسجين لنضارة وحيوية البشرة', price: 2000, category: 'skin_treatment', duration_minutes: 60, is_active: true },
      { name: 'جلسة فيرمينج', description: 'جلسة شد وتماسك البشرة', price: 1800, category: 'skin_treatment', duration_minutes: 60, is_active: true },
      
      // توريد
      { name: 'توريد خدود', description: 'توريد علاجي للخدود (شامل الجلسة والإعادة)', price: 1500, category: 'skin_treatment', duration_minutes: 45, is_active: true },
      { name: 'توريد شفايف', description: 'توريد علاجي للشفايف (شامل الجلسة والإعادة)', price: 2500, category: 'skin_treatment', duration_minutes: 45, is_active: true },
      
      // جلسات علاج الشعر
      { name: 'اكسوزوم ألماني للشعر', description: 'أفضل علاج للشعر بتقنية الاكسوزوم الألمانية', price: 4000, category: 'hair_treatment', duration_minutes: 60, is_active: true },
      { name: 'اكسوزوم كوري للشعر', description: 'علاج متقدم للشعر بتقنية الاكسوزوم الكورية', price: 3600, category: 'hair_treatment', duration_minutes: 60, is_active: true },
      { name: 'اكسوزوم مصري للشعر', description: 'علاج فعال للشعر بتقنية الاكسوزوم', price: 2000, category: 'hair_treatment', duration_minutes: 60, is_active: true },
      { name: 'خلايا جذعية للشعر', description: 'علاج الشعر بالخلايا الجذعية', price: 1500, category: 'hair_treatment', duration_minutes: 60, is_active: true },
      { name: 'ميزوثيرابي للشعر', description: 'حقن ميزوثيرابي لتغذية فروة الرأس', price: 1200, category: 'hair_treatment', duration_minutes: 45, is_active: true },
      { name: 'مالتي فيتامين للشعر', description: 'حقن فيتامينات متعددة لتقوية الشعر', price: 850, category: 'hair_treatment', duration_minutes: 30, is_active: true },
      { name: 'بلازما PRP للشعر', description: 'علاج الشعر بالبلازما الغنية بالصفائح الدموية', price: 2000, category: 'hair_treatment', duration_minutes: 60, is_active: true },
      { name: 'بلازما عادية للشعر', description: 'جلسة بلازما أساسية للشعر', price: 500, category: 'hair_treatment', duration_minutes: 45, is_active: true },
      
      // الحجامة
      { name: 'حجامة ظهر كامل', description: 'حجامة علاجية للظهر الكامل (للرجال فقط)', price: 650, category: 'other', duration_minutes: 45, is_active: true },
      { name: 'حجامة جسم كامل', description: 'حجامة علاجية للجسم الكامل (للرجال فقط)', price: 1000, category: 'other', duration_minutes: 75, is_active: true },
      
      // الفيلر
      { name: 'فيلر الخدود', description: 'ملء الخدود بالفيلر (يبدأ من 2000 جنيه/مل)', price: 2000, category: 'other', duration_minutes: 30, is_active: true },
      { name: 'فيلر التوريد', description: 'فيلر لتوريد الوجه (يبدأ من 2500 جنيه)', price: 2500, category: 'other', duration_minutes: 30, is_active: true },
      { name: 'فيلر كونتور الوجه (التكساس)', description: 'نحت وتحديد الفك والوجه (يبدأ من 3000 جنيه/مل)', price: 3000, category: 'other', duration_minutes: 45, is_active: true },
      { name: 'فيلر الذقن', description: 'تحديد وتجميل الذقن (يبدأ من 3000 جنيه/مل)', price: 3000, category: 'other', duration_minutes: 30, is_active: true },
      { name: 'فيلر الشفايف كوري', description: 'فيلر شفايف كوري (4-6 شهور) - 4000 جنيه/مل', price: 4000, category: 'other', duration_minutes: 30, is_active: true },
      { name: 'فيلر الشفايف ألماني', description: 'فيلر شفايف ألماني (9-12 شهر) - 6000 جنيه/مل', price: 6000, category: 'other', duration_minutes: 30, is_active: true },
      { name: 'فيلر الشفايف سويسري', description: 'فيلر شفايف سويسري (12-18 شهر) - 8000 جنيه/مل', price: 8000, category: 'other', duration_minutes: 30, is_active: true },
      { name: 'فيلر الشفايف فرنسي', description: 'فيلر شفايف فرنسي جودة عالية - 6000 جنيه/مل', price: 6000, category: 'other', duration_minutes: 30, is_active: true },
      { name: 'فيلر تحت العين', description: 'علاج الهالات والتجاويف (يبدأ من 4500 جنيه/مل)', price: 4500, category: 'other', duration_minutes: 30, is_active: true },
      { name: 'فيلر الأنف (Nose Job)', description: 'تجميل الأنف بدون جراحة (يبدأ من 4500 جنيه/مل)', price: 4500, category: 'other', duration_minutes: 30, is_active: true },
      { name: 'فيلر ملء الصدغ', description: 'ملء منطقة الصدغ (يبدأ من 3000 جنيه/مل)', price: 3000, category: 'other', duration_minutes: 30, is_active: true },
      
      // البوتكس والسكين بوستر
      { name: 'بوتكس', description: 'حقن البوتكس لإزالة التجاعيد (يبدأ من 1200 جنيه بعد الخصم)', price: 1200, category: 'other', duration_minutes: 30, is_active: true },
      { name: 'سكين بوستر', description: 'حقن لنضارة وترطيب البشرة (يبدأ من 1800 جنيه بعد الخصم)', price: 1800, category: 'other', duration_minutes: 30, is_active: true }
    ];

    const { data: servicesData, error: servicesError } = await supabase.from('services').insert(services).select();
    
    if (servicesError) throw servicesError;
    console.log(`✅ Inserted ${servicesData.length} services`);

    console.log('✅ Data update completed successfully!');
    console.log(`\n📊 Summary:`);
    console.log(`   - Branches: ${branches.length}`);
    console.log(`   - Services: ${servicesData.length}`);
    
  } catch (error) {
    console.error('❌ Error updating data:', error);
    process.exit(1);
  }
}

updateRealData();
