const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

async function updateCategories() {
  try {
    console.log('🔄 Updating service categories...');

    // Update Cupping services to 'cupping' category
    const { error: cuppingError } = await supabase
      .from('services')
      .update({ category: 'cupping' })
      .in('name', ['حجامة ظهر كامل', 'حجامة جسم كامل']);

    if (cuppingError) throw cuppingError;
    console.log('✅ Updated cupping services');

    // Update Cosmetic services (Filler, Botox, Skin Booster) to 'cosmetic' category
    const cosmeticServices = [
      'فيلر الخدود',
      'فيلر التوريد',
      'فيلر كونتور الوجه (التكساس)',
      'فيلر الذقن',
      'فيلر الشفايف كوري',
      'فيلر الشفايف ألماني',
      'فيلر الشفايف سويسري',
      'فيلر الشفايف فرنسي',
      'فيلر تحت العين',
      'فيلر الأنف (Nose Job)',
      'فيلر ملء الصدغ',
      'بوتكس',
      'سكين بوستر'
    ];

    const { error: cosmeticError } = await supabase
      .from('services')
      .update({ category: 'cosmetic' })
      .in('name', cosmeticServices);

    if (cosmeticError) throw cosmeticError;
    console.log('✅ Updated cosmetic services');

    console.log('✅ Categories updated successfully!');
    
  } catch (error) {
    console.error('❌ Error updating categories:', error);
    process.exit(1);
  }
}

updateCategories();
