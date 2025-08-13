-- Insert sample projects for the website with correct status values
INSERT INTO public.projects (title, description, sector, location, investment_size, expected_returns, timeline, status, incentives) VALUES
(
  'Modern Coffee Processing Plant - Uganda',
  'State-of-the-art coffee processing facility in Kampala focusing on premium Arabica coffee exports. This project includes advanced sorting, washing, and drying technologies to produce specialty grade coffee for international markets. The facility will create 150+ direct jobs and support over 2,000 smallholder farmers.',
  'Agro-processing',
  'Kampala, Uganda',
  '$2.5M - $3.2M',
  '18-22% IRR',
  '18 months',
  'Approved',
  ARRAY['15% corporate tax rate for 10 years', 'Land lease at preferential rates', 'Export processing zone benefits', 'Fast-track work permit processing']
),
(
  'Medical Equipment Manufacturing Hub',
  'Comprehensive medical device manufacturing facility producing high-quality diagnostic equipment, surgical instruments, and medical supplies for East African markets. Strategic location near Nairobi International Airport for efficient logistics and distribution across the region.',
  'Healthcare',
  'Nairobi, Kenya',
  '$1.8M - $2.4M',
  '20-25% IRR',
  '24 months',
  'Early Stage',
  ARRAY['Manufacturing under bond scheme', '0% import duty on raw materials', '10-year tax holiday', 'EPZ benefits']
),
(
  'Regional Transport & Logistics Center',
  'Modern logistics and warehousing facility serving as a distribution hub for East Africa. Features include cold storage, cross-docking facilities, and integrated transport management systems. Strategic location along the Northern Corridor connecting Uganda, Kenya, and Tanzania.',
  'Transport',
  'Mombasa, Kenya',
  '$4.2M - $5.8M',
  '16-20% IRR',
  '30 months',
  'Negotiation',
  ARRAY['Special Economic Zone status', '25% corporate tax rate', 'Infrastructure development support', 'Streamlined customs procedures']
),
(
  'Aquaculture Processing Facility',
  'Modern fish processing plant focusing on tilapia and catfish for both local and export markets. Includes hatchery operations, grow-out ponds, and processing facilities with international quality certifications. Expected to process 2,000 tons annually.',
  'Agro-processing',
  'Jinja, Uganda',
  '$1.2M - $1.8M',
  '22-28% IRR',
  '15 months',
  'Approved',
  ARRAY['Agricultural sector tax incentives', 'Export promotion benefits', 'Duty-free importation of equipment', 'Government co-financing available']
),
(
  'Pharmaceutical Manufacturing Plant',
  'WHO-GMP certified pharmaceutical manufacturing facility producing essential medicines for East African markets. Focus on generic drugs addressing regional health priorities including antimalarials, antibiotics, and chronic disease medications.',
  'Healthcare',
  'Dar es Salaam, Tanzania',
  '$3.5M - $4.8M',
  '25-30% IRR',
  '36 months',
  'Early Stage',
  ARRAY['Pioneer industry status', '5-year tax holiday', 'Accelerated depreciation allowances', 'Government procurement preferences']
),
(
  'Renewable Energy Storage Solutions',
  'Battery manufacturing and energy storage systems facility serving growing renewable energy sector. Production of lithium-ion batteries and integrated energy management systems for solar installations across East Africa.',
  'Energy',
  'Kigali, Rwanda',
  '$2.8M - $3.6M',
  '19-24% IRR',
  '28 months',
  'Approved',
  ARRAY['Green investment tax credits', '7-year corporate tax exemption', 'Preferential land allocation', 'Export facilitation services']
);