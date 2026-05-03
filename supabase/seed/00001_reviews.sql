-- ═══════════════════════════════════════════════════════════
-- Wasleen Foldable Garage — Review Seed Data
-- ═══════════════════════════════════════════════════════════

INSERT INTO reviews (name, location, rating, title, content, verified, status, created_at) VALUES
(
  'Ahmed Al Maktoum',
  'Dubai',
  5,
  'Exceptional quality and craftsmanship',
  'The installation team was professional and completed the project ahead of schedule. The automated system works flawlessly, and the aesthetic matches our villa perfectly.',
  true,
  'approved',
  NOW() - INTERVAL '30 days'
),
(
  'Sarah Johnson',
  'Abu Dhabi',
  5,
  'Remarkable temperature difference',
  'We installed the Smart system with glass panels. The difference in temperature under the carport is remarkable. Our car stays cool even in peak summer. Highly recommend the glass option.',
  true,
  'approved',
  NOW() - INTERVAL '25 days'
),
(
  'Khalid Al Zaabi',
  'Sharjah',
  4,
  'Excellent UV protection',
  'Very pleased with the quality. The polycarbonate panels provide excellent UV protection. Would recommend upgrading to the smart system for convenience. Minor delay in installation but quality made up for it.',
  true,
  'approved',
  NOW() - INTERVAL '20 days'
),
(
  'Fatima Al Hashimi',
  'Dubai',
  5,
  'Engineering at its finest',
  'The foldable mechanism is engineering at its finest. It adds a modern architectural element to our villa. Worth every dirham. The remote operation is incredibly smooth.',
  true,
  'approved',
  NOW() - INTERVAL '15 days'
),
(
  'James Mitchell',
  'Ajman',
  5,
  'Smooth operation, exceptional service',
  'Three months in and no issues at all. The remote operation is smooth and quiet. Customer service has been exceptional throughout the process. Very happy with our investment.',
  true,
  'approved',
  NOW() - INTERVAL '10 days'
),
(
  'Layla Al Mansouri',
  'Abu Dhabi',
  5,
  'Transformed our outdoor space',
  'We use our carport as both parking and an outdoor entertaining area. The retractable design gives us flexibility. Guests always compliment how premium it looks. A true conversation starter.',
  true,
  'approved',
  NOW() - INTERVAL '7 days'
),
(
  'Omar Hassan',
  'Dubai',
  4,
  'Solid build, great investment',
  'The build quality is impressive. You can feel the difference in materials compared to other options in the market. Went with Medium Smoke colour — looks fantastic against our villa facade.',
  false,
  'approved',
  NOW() - INTERVAL '5 days'
),
(
  'Nora Al Suwaidi',
  'Ras Al Khaimah',
  5,
  'Perfect for coastal properties',
  'Living by the coast, we needed something that could withstand humidity and salt air. The anodised aluminium finish is holding up perfectly. Very glad we chose Wasleen.',
  true,
  'approved',
  NOW() - INTERVAL '3 days'
);
