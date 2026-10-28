(() => {
  'use strict';
  const STORAGE_KEY = 'masksmp-site-config-v1';
  const DB_NAME = 'masksmp-site-db';
  const DB_STORE = 'settings';
  const MAX_PHOTOS = 8;
  const MAX_IMAGE_DATA_LENGTH = 330000;
  const MAX_TOTAL_IMAGE_DATA_LENGTH = 1800000;
  const MAX_ASSET_FILE_BYTES = 15 * 1024 * 1024;
  const MAX_TOTAL_ASSET_BYTES = 15 * 1024 * 1024;
  const MAX_CUSTOM_MASK_MODEL_BYTES = 2 * 1024 * 1024;
  const MAX_CUSTOM_MASK_TEXTURE_BYTES = 1 * 1024 * 1024;
  const MAX_TOTAL_CUSTOM_MASK_BYTES = 10 * 1024 * 1024;
  const STATIC_TEXT_FIELDS = [{"key":"index_text_003","page":"Home","label":"Home · A · Upgrading","defaultValue":"Upgrading"},{"key":"index_text_004","page":"Home","label":"Home · A · License","defaultValue":"License"},{"key":"index_text_005","page":"Home","label":"Home · H1 · Mask","defaultValue":"Mask"},{"key":"index_text_006","page":"Home","label":"Home · H1 · SMP","defaultValue":"SMP"},{"key":"index_text_007","page":"Home","label":"Home · SMALL · Every mask has","defaultValue":"Every mask has"},{"key":"index_text_008","page":"Home","label":"Home · B · 3 unique powers","defaultValue":"3 unique powers"},{"key":"index_text_009","page":"Home","label":"Home · SMALL · Upgrade with","defaultValue":"Upgrade with"},{"key":"index_text_010","page":"Home","label":"Home · B · /mask upgrade","defaultValue":"/mask upgrade"},{"key":"index_text_011","page":"Home","label":"Home · SMALL · Collection","defaultValue":"Collection"},{"key":"index_text_012","page":"Home","label":"Home · B · 16 masks · 6 tiers","defaultValue":"16 masks · 6 tiers"},{"key":"index_text_013","page":"Home","label":"Home · A · Get the plugin","defaultValue":"Get the plugin"},{"key":"index_text_016","page":"Home","label":"Home · P · MADE FOR YOUR SMP","defaultValue":"MADE FOR YOUR SMP"},{"key":"index_text_017","page":"Home","label":"Home · H2 · Build your","defaultValue":"Build your"},{"key":"index_text_018","page":"Home","label":"Home · H2 · own story.","defaultValue":"own story."},{"key":"index_text_019","page":"Home","label":"Home · P · Distinct masks, individual powers and a clear progression system — brought together i…","defaultValue":"Distinct masks, individual powers and a clear progression system — brought together in a website where every part has its own page."},{"key":"index_text_020","page":"Home","label":"Home · A · 01 / FEATURES","defaultValue":"01 / FEATURES"},{"key":"index_text_021","page":"Home","label":"Home · A · More ways to play","defaultValue":"More ways to play"},{"key":"index_text_022","page":"Home","label":"Home · P · Discover the core systems behind MaskSMP.","defaultValue":"Discover the core systems behind MaskSMP."},{"key":"index_text_023","page":"Home","label":"Home · A · Explore features ↗","defaultValue":"Explore features ↗"},{"key":"index_text_024","page":"Home","label":"Home · A · 02 / MASKS","defaultValue":"02 / MASKS"},{"key":"index_text_025","page":"Home","label":"Home · A · Find your mask","defaultValue":"Find your mask"},{"key":"index_text_026","page":"Home","label":"Home · P · Browse the collection in the interactive 3D builder.","defaultValue":"Browse the collection in the interactive 3D builder."},{"key":"index_text_027","page":"Home","label":"Home · A · Open mask builder ↗","defaultValue":"Open mask builder ↗"},{"key":"index_text_028","page":"Home","label":"Home · A · 03 / UPGRADING","defaultValue":"03 / UPGRADING"},{"key":"index_text_029","page":"Home","label":"Home · A · Keep progressing","defaultValue":"Keep progressing"},{"key":"index_text_030","page":"Home","label":"Home · P · Compare mask abilities and preview the six-tier upgrade path.","defaultValue":"Compare mask abilities and preview the six-tier upgrade path."},{"key":"index_text_031","page":"Home","label":"Home · A · View progression ↗","defaultValue":"View progression ↗"},{"key":"index_text_032","page":"Home","label":"Home · P · READY TO TRY IT?","defaultValue":"READY TO TRY IT?"},{"key":"index_text_033","page":"Home","label":"Home · H2 · Choose your version.","defaultValue":"Choose your version."},{"key":"index_text_034","page":"Home","label":"Home · P · Select the plugin release that matches your Minecraft server.","defaultValue":"Select the plugin release that matches your Minecraft server."},{"key":"index_text_035","page":"Home","label":"Home · A · Open downloads","defaultValue":"Open downloads"},{"key":"index_text_036","page":"Home","label":"Home · A · Open on Modrinth","defaultValue":"Open on Modrinth"},{"key":"index_text_037","page":"Home","label":"Home · H2 · Mask","defaultValue":"Mask"},{"key":"index_text_038","page":"Home","label":"Home · H2 · builder","defaultValue":"builder"},{"key":"index_text_039","page":"Home","label":"Home · P · Create the loadout of your dreams.","defaultValue":"Create the loadout of your dreams."},{"key":"index_text_040","page":"Home","label":"Home · SMALL · Powers unlocked","defaultValue":"Powers unlocked"},{"key":"index_text_041","page":"Home","label":"Home · A · Download plugin","defaultValue":"Download plugin"},{"key":"index_text_042","page":"Home","label":"Home · DIV · 3D preview","defaultValue":"3D preview"},{"key":"index_text_043","page":"Home","label":"Home · SMALL · Mask","defaultValue":"Mask"},{"key":"index_text_044","page":"Home","label":"Home · SMALL · Upgrade tier","defaultValue":"Upgrade tier"},{"key":"index_text_045","page":"Home","label":"Home · SMALL · Powers","defaultValue":"Powers"},{"key":"index_text_046","page":"Home","label":"Home · SMALL · Upgrade command","defaultValue":"Upgrade command"},{"key":"index_text_047","page":"Home","label":"Home · SPAN · /mask upgrade","defaultValue":"/mask upgrade"},{"key":"index_text_048","page":"Home","label":"Home · H2 · All masks","defaultValue":"All masks"},{"key":"index_text_049","page":"Home","label":"Home · SPAN · AUTOPLAY","defaultValue":"AUTOPLAY"},{"key":"index_text_050","page":"Home","label":"Home · SPAN · Pos","defaultValue":"Pos"},{"key":"index_text_051","page":"Home","label":"Home · SPAN · Mask","defaultValue":"Mask"},{"key":"index_text_052","page":"Home","label":"Home · SPAN · Powers","defaultValue":"Powers"},{"key":"index_text_053","page":"Home","label":"Home · SPAN · Tiers","defaultValue":"Tiers"},{"key":"index_text_054","page":"Home","label":"Home · H3 · Overview","defaultValue":"Overview"},{"key":"index_text_055","page":"Home","label":"Home · SMALL · Selected mask","defaultValue":"Selected mask"},{"key":"index_text_056","page":"Home","label":"Home · SMALL · Powers","defaultValue":"Powers"},{"key":"index_text_057","page":"Home","label":"Home · B · 3","defaultValue":"3"},{"key":"index_text_058","page":"Home","label":"Home · SMALL · Tiers","defaultValue":"Tiers"},{"key":"index_text_059","page":"Home","label":"Home · B · 6","defaultValue":"6"},{"key":"index_text_060","page":"Home","label":"Home · DIV · Selected","defaultValue":"Selected"},{"key":"index_text_061","page":"Home","label":"Home · H2 · Straight from","defaultValue":"Straight from"},{"key":"index_text_062","page":"Home","label":"Home · H2 · the server","defaultValue":"the server"},{"key":"index_text_065","page":"Home","label":"Home · P · FEATURED VIDEO","defaultValue":"FEATURED VIDEO"},{"key":"index_text_066","page":"Home","label":"Home · H2 · Watch the","defaultValue":"Watch the"},{"key":"index_text_067","page":"Home","label":"Home · H2 · trailer.","defaultValue":"trailer."},{"key":"index_text_068","page":"Home","label":"Home · P · See MaskSMP in action.","defaultValue":"See MaskSMP in action."},{"key":"index_text_069","page":"Home","label":"Home · FOOTER · Original Minecraft plugin by Dinobeast.","defaultValue":"Original Minecraft plugin by Dinobeast."},{"key":"index_text_070","page":"Home","label":"Home · A · Features","defaultValue":"Features"},{"key":"index_text_071","page":"Home","label":"Home · A · Masks","defaultValue":"Masks"},{"key":"index_text_072","page":"Home","label":"Home · A · Upgrading","defaultValue":"Upgrading"},{"key":"index_text_073","page":"Home","label":"Home · A · Gallery","defaultValue":"Gallery"},{"key":"index_text_074","page":"Home","label":"Home · A · Downloads","defaultValue":"Downloads"},{"key":"index_text_075","page":"Home","label":"Home · A · FAQ","defaultValue":"FAQ"},{"key":"index_text_076","page":"Home","label":"Home · A · License","defaultValue":"License"},{"key":"index_text_077","page":"Home","label":"Home · A · GitHub ↗","defaultValue":"GitHub ↗"},{"key":"index_text_078","page":"Home","label":"Home · SMALL · Not affiliated with Mojang or Microsoft. · ©","defaultValue":"Not affiliated with Mojang or Microsoft. · ©"},{"key":"index_text_079","page":"Home","label":"Home · SMALL · 2026","defaultValue":"2026"},{"key":"index_text_080","page":"Home","label":"Home · SMALL · MaskSMP. All rights reserved.","defaultValue":"MaskSMP. All rights reserved."},{"key":"features_text_003","page":"Features","label":"Features · A · Upgrading","defaultValue":"Upgrading"},{"key":"features_text_004","page":"Features","label":"Features · A · License","defaultValue":"License"},{"key":"features_text_005","page":"Features","label":"Features · P · INSIDE MASKSMP","defaultValue":"INSIDE MASKSMP"},{"key":"features_text_006","page":"Features","label":"Features · H1 · More than a mask.","defaultValue":"More than a mask."},{"key":"features_text_007","page":"Features","label":"Features · H1 · A whole playstyle.","defaultValue":"A whole playstyle."},{"key":"features_text_008","page":"Features","label":"Features · P · MaskSMP adds collectible mask equipment, distinct powers and progression to a Minecra…","defaultValue":"MaskSMP adds collectible mask equipment, distinct powers and progression to a Minecraft server. Here are the systems included in the project and the milestones that shaped its development."},{"key":"features_text_009","page":"Features","label":"Features · P · WHAT'S INCLUDED","defaultValue":"WHAT'S INCLUDED"},{"key":"features_text_010","page":"Features","label":"Features · H2 · Built for different","defaultValue":"Built for different"},{"key":"features_text_011","page":"Features","label":"Features · H2 · ways to play.","defaultValue":"ways to play."},{"key":"features_text_012","page":"Features","label":"Features · P · Pick a mask for its identity and powers, then improve it as your player progresses. T…","defaultValue":"Pick a mask for its identity and powers, then improve it as your player progresses. The visuals are supported by a matching resource pack."},{"key":"features_text_013","page":"Features","label":"Features · P · 01 / COLLECTION","defaultValue":"01 / COLLECTION"},{"key":"features_text_014","page":"Features","label":"Features · H3 · 16 mask previews","defaultValue":"16 mask previews"},{"key":"features_text_015","page":"Features","label":"Features · P · The interactive viewer includes Dragon, Flame, Shadow, Storm, Ocean, Earth, Ice, Void…","defaultValue":"The interactive viewer includes Dragon, Flame, Shadow, Storm, Ocean, Earth, Ice, Void, Nature, Warrior, Speed, Miner, Hunter, Angel, Demon and Galaxy."},{"key":"features_text_016","page":"Features","label":"Features · A · Browse the collection","defaultValue":"Browse the collection"},{"key":"features_text_017","page":"Features","label":"Features · P · 02 / POWERS","defaultValue":"02 / POWERS"},{"key":"features_text_018","page":"Features","label":"Features · H3 · Three powers per mask","defaultValue":"Three powers per mask"},{"key":"features_text_019","page":"Features","label":"Features · P · Each mask has three abilities, from mobility and utility to attacks and crowd control…","defaultValue":"Each mask has three abilities, from mobility and utility to attacks and crowd control. Ability keys can work with the compatible Command Keys mod."},{"key":"features_text_020","page":"Features","label":"Features · A · Explore mask abilities","defaultValue":"Explore mask abilities"},{"key":"features_text_021","page":"Features","label":"Features · P · 03 / PROGRESSION","defaultValue":"03 / PROGRESSION"},{"key":"features_text_022","page":"Features","label":"Features · H3 · Six upgrade tiers","defaultValue":"Six upgrade tiers"},{"key":"features_text_023","page":"Features","label":"Features · P · Upgrade masks through six tiers. Costs are controlled by the plugin configuration, so…","defaultValue":"Upgrade masks through six tiers. Costs are controlled by the plugin configuration, so values can depend on the server."},{"key":"features_text_024","page":"Features","label":"Features · A · See the upgrade system","defaultValue":"See the upgrade system"},{"key":"features_text_025","page":"Features","label":"Features · P · 04 / ENCHANTMENTS","defaultValue":"04 / ENCHANTMENTS"},{"key":"features_text_026","page":"Features","label":"Features · H3 · Extra customization","defaultValue":"Extra customization"},{"key":"features_text_027","page":"Features","label":"Features · P · Mask enchantments add another layer of customisation, letting players work towards di…","defaultValue":"Mask enchantments add another layer of customisation, letting players work towards different equipment combinations beyond a mask's base power."},{"key":"features_text_028","page":"Features","label":"Features · A · Explore progression","defaultValue":"Explore progression"},{"key":"features_text_029","page":"Features","label":"Features · P · 05 / SERVER PLAY","defaultValue":"05 / SERVER PLAY"},{"key":"features_text_030","page":"Features","label":"Features · H3 · SMP and PvP focused","defaultValue":"SMP and PvP focused"},{"key":"features_text_031","page":"Features","label":"Features · P · Masks can shape combat choices and player identity in survival, Lifesteal, competitiv…","defaultValue":"Masks can shape combat choices and player identity in survival, Lifesteal, competitive and creator SMPs. The exact balance depends on the server's rules."},{"key":"features_text_032","page":"Features","label":"Features · A · Choose a release","defaultValue":"Choose a release"},{"key":"features_text_033","page":"Features","label":"Features · P · 06 / VISUALS","defaultValue":"06 / VISUALS"},{"key":"features_text_034","page":"Features","label":"Features · H3 · Custom resource pack","defaultValue":"Custom resource pack"},{"key":"features_text_035","page":"Features","label":"Features · P · The matching pack supplies mask models and textures, ability GUI icons and custom HUD…","defaultValue":"The matching pack supplies mask models and textures, ability GUI icons and custom HUD artwork. Use the matching pack version for the intended in-game design."},{"key":"features_text_036","page":"Features","label":"Features · A · Get the resource pack","defaultValue":"Get the resource pack"},{"key":"features_text_037","page":"Features","label":"Features · P · PROJECT TIMELINE","defaultValue":"PROJECT TIMELINE"},{"key":"features_text_038","page":"Features","label":"Features · H2 · From early visuals","defaultValue":"From early visuals"},{"key":"features_text_039","page":"Features","label":"Features · H2 · to public release.","defaultValue":"to public release."},{"key":"features_text_040","page":"Features","label":"Features · P · Milestones from the first idea through the public release and continued development.","defaultValue":"Milestones from the first idea through the public release and continued development."},{"key":"features_text_041","page":"Features","label":"Features · P · 7 MAY 2026","defaultValue":"7 MAY 2026"},{"key":"features_text_042","page":"Features","label":"Features · H3 · The idea begins","defaultValue":"The idea begins"},{"key":"features_text_043","page":"Features","label":"Features · P · I created the MaskSMP Discord server after coming up with the idea, and started resea…","defaultValue":"I created the MaskSMP Discord server after coming up with the idea, and started researching how to develop the project."},{"key":"features_text_044","page":"Features","label":"Features · P · LATE MAY 2026","defaultValue":"LATE MAY 2026"},{"key":"features_text_045","page":"Features","label":"Features · H3 · First steps in plugin development","defaultValue":"First steps in plugin development"},{"key":"features_text_046","page":"Features","label":"Features · P · I began coding MaskSMP and learning how to build a Minecraft plugin for the first time.","defaultValue":"I began coding MaskSMP and learning how to build a Minecraft plugin for the first time."},{"key":"features_text_047","page":"Features","label":"Features · P · JUNE 2026","defaultValue":"JUNE 2026"},{"key":"features_text_048","page":"Features","label":"Features · H3 · Code, models and textures","defaultValue":"Code, models and textures"},{"key":"features_text_049","page":"Features","label":"Features · P · Development continued across the plugin code, mask models and their textures.","defaultValue":"Development continued across the plugin code, mask models and their textures."},{"key":"features_text_050","page":"Features","label":"Features · P · EARLY JULY 2026","defaultValue":"EARLY JULY 2026"},{"key":"features_text_051","page":"Features","label":"Features · H3 · Halfway through the mask models","defaultValue":"Halfway through the mask models"},{"key":"features_text_052","page":"Features","label":"Features · P · By early July, approximately half of the planned mask models had been completed.","defaultValue":"By early July, approximately half of the planned mask models had been completed."},{"key":"features_text_053","page":"Features","label":"Features · P · 24 JULY 2026","defaultValue":"24 JULY 2026"},{"key":"features_text_054","page":"Features","label":"Features · H3 · 15 mask models completed","defaultValue":"15 mask models completed"},{"key":"features_text_055","page":"Features","label":"Features · P · I completed the original 15 mask models and textures, giving the project its first ma…","defaultValue":"I completed the original 15 mask models and textures, giving the project its first major visual milestone."},{"key":"features_text_056","page":"Features","label":"Features · P · AROUND AUGUST 2026","defaultValue":"AROUND AUGUST 2026"},{"key":"features_text_057","page":"Features","label":"Features · H3 · First public release","defaultValue":"First public release"},{"key":"features_text_058","page":"Features","label":"Features · P · I published MaskSMP on Modrinth so other players and server owners could try the plugin.","defaultValue":"I published MaskSMP on Modrinth so other players and server owners could try the plugin."},{"key":"features_text_059","page":"Features","label":"Features · P · 20 OCTOBER 2026","defaultValue":"20 OCTOBER 2026"},{"key":"features_text_060","page":"Features","label":"Features · H3 · Development continues","defaultValue":"Development continues"},{"key":"features_text_061","page":"Features","label":"Features · P · I uploaded another plugin version, continuing development after the initial public re…","defaultValue":"I uploaded another plugin version, continuing development after the initial public release."},{"key":"features_text_062","page":"Features","label":"Features · P · READY TO TRY IT?","defaultValue":"READY TO TRY IT?"},{"key":"features_text_063","page":"Features","label":"Features · H2 · Choose your version.","defaultValue":"Choose your version."},{"key":"features_text_064","page":"Features","label":"Features · A · Open downloads","defaultValue":"Open downloads"},{"key":"features_text_065","page":"Features","label":"Features · FOOTER · Original Minecraft plugin by Dinobeast.","defaultValue":"Original Minecraft plugin by Dinobeast."},{"key":"features_text_066","page":"Features","label":"Features · A · Features","defaultValue":"Features"},{"key":"features_text_067","page":"Features","label":"Features · A · Masks","defaultValue":"Masks"},{"key":"features_text_068","page":"Features","label":"Features · A · Upgrading","defaultValue":"Upgrading"},{"key":"features_text_069","page":"Features","label":"Features · A · Gallery","defaultValue":"Gallery"},{"key":"features_text_070","page":"Features","label":"Features · A · Downloads","defaultValue":"Downloads"},{"key":"features_text_071","page":"Features","label":"Features · A · FAQ","defaultValue":"FAQ"},{"key":"features_text_072","page":"Features","label":"Features · A · License","defaultValue":"License"},{"key":"features_text_073","page":"Features","label":"Features · A · GitHub ↗","defaultValue":"GitHub ↗"},{"key":"features_text_074","page":"Features","label":"Features · SMALL · Not affiliated with Mojang or Microsoft. · ©","defaultValue":"Not affiliated with Mojang or Microsoft. · ©"},{"key":"features_text_075","page":"Features","label":"Features · SMALL · 2026","defaultValue":"2026"},{"key":"features_text_076","page":"Features","label":"Features · SMALL · MaskSMP. All rights reserved.","defaultValue":"MaskSMP. All rights reserved."},{"key":"masks_text_003","page":"Masks","label":"Masks · A · Upgrading","defaultValue":"Upgrading"},{"key":"masks_text_004","page":"Masks","label":"Masks · A · License","defaultValue":"License"},{"key":"masks_text_005","page":"Masks","label":"Masks · P · INTERACTIVE MASK BUILDER","defaultValue":"INTERACTIVE MASK BUILDER"},{"key":"masks_text_006","page":"Masks","label":"Masks · H1 · Choose your","defaultValue":"Choose your"},{"key":"masks_text_007","page":"Masks","label":"Masks · H1 · mask.","defaultValue":"mask."},{"key":"masks_text_008","page":"Masks","label":"Masks · P · Preview mask designs in 3D, select a mask and explore the abilities and upgrade tiers…","defaultValue":"Preview mask designs in 3D, select a mask and explore the abilities and upgrade tiers behind it."},{"key":"masks_text_009","page":"Masks","label":"Masks · SMALL · Every mask has","defaultValue":"Every mask has"},{"key":"masks_text_010","page":"Masks","label":"Masks · B · 3 unique powers","defaultValue":"3 unique powers"},{"key":"masks_text_011","page":"Masks","label":"Masks · SMALL · Upgrade with","defaultValue":"Upgrade with"},{"key":"masks_text_012","page":"Masks","label":"Masks · B · /mask upgrade","defaultValue":"/mask upgrade"},{"key":"masks_text_013","page":"Masks","label":"Masks · SMALL · Collection","defaultValue":"Collection"},{"key":"masks_text_014","page":"Masks","label":"Masks · B · 16 masks · 6 tiers","defaultValue":"16 masks · 6 tiers"},{"key":"masks_text_015","page":"Masks","label":"Masks · A · Get the plugin","defaultValue":"Get the plugin"},{"key":"masks_text_018","page":"Masks","label":"Masks · P · MADE FOR YOUR SMP","defaultValue":"MADE FOR YOUR SMP"},{"key":"masks_text_019","page":"Masks","label":"Masks · H2 · Build your","defaultValue":"Build your"},{"key":"masks_text_020","page":"Masks","label":"Masks · H2 · own story.","defaultValue":"own story."},{"key":"masks_text_021","page":"Masks","label":"Masks · P · Distinct masks, individual powers and a clear progression system — brought together i…","defaultValue":"Distinct masks, individual powers and a clear progression system — brought together in a website where every part has its own page."},{"key":"masks_text_022","page":"Masks","label":"Masks · A · 01 / FEATURES","defaultValue":"01 / FEATURES"},{"key":"masks_text_023","page":"Masks","label":"Masks · A · More ways to play","defaultValue":"More ways to play"},{"key":"masks_text_024","page":"Masks","label":"Masks · P · Discover the core systems behind MaskSMP.","defaultValue":"Discover the core systems behind MaskSMP."},{"key":"masks_text_025","page":"Masks","label":"Masks · A · Explore features ↗","defaultValue":"Explore features ↗"},{"key":"masks_text_026","page":"Masks","label":"Masks · A · 02 / MASKS","defaultValue":"02 / MASKS"},{"key":"masks_text_027","page":"Masks","label":"Masks · A · Find your mask","defaultValue":"Find your mask"},{"key":"masks_text_028","page":"Masks","label":"Masks · P · Browse the collection in the interactive 3D builder.","defaultValue":"Browse the collection in the interactive 3D builder."},{"key":"masks_text_029","page":"Masks","label":"Masks · A · Open mask builder ↗","defaultValue":"Open mask builder ↗"},{"key":"masks_text_030","page":"Masks","label":"Masks · A · 03 / UPGRADING","defaultValue":"03 / UPGRADING"},{"key":"masks_text_031","page":"Masks","label":"Masks · A · Keep progressing","defaultValue":"Keep progressing"},{"key":"masks_text_032","page":"Masks","label":"Masks · P · Compare mask abilities and preview the six-tier upgrade path.","defaultValue":"Compare mask abilities and preview the six-tier upgrade path."},{"key":"masks_text_033","page":"Masks","label":"Masks · A · View progression ↗","defaultValue":"View progression ↗"},{"key":"masks_text_034","page":"Masks","label":"Masks · P · READY TO TRY IT?","defaultValue":"READY TO TRY IT?"},{"key":"masks_text_035","page":"Masks","label":"Masks · H2 · Choose your version.","defaultValue":"Choose your version."},{"key":"masks_text_036","page":"Masks","label":"Masks · P · Select the plugin release that matches your Minecraft server.","defaultValue":"Select the plugin release that matches your Minecraft server."},{"key":"masks_text_037","page":"Masks","label":"Masks · A · Open downloads","defaultValue":"Open downloads"},{"key":"masks_text_038","page":"Masks","label":"Masks · A · Open on Modrinth","defaultValue":"Open on Modrinth"},{"key":"masks_text_039","page":"Masks","label":"Masks · H2 · Mask","defaultValue":"Mask"},{"key":"masks_text_040","page":"Masks","label":"Masks · H2 · builder","defaultValue":"builder"},{"key":"masks_text_041","page":"Masks","label":"Masks · P · Create the loadout of your dreams.","defaultValue":"Create the loadout of your dreams."},{"key":"masks_text_042","page":"Masks","label":"Masks · SMALL · Powers unlocked","defaultValue":"Powers unlocked"},{"key":"masks_text_043","page":"Masks","label":"Masks · A · Download plugin","defaultValue":"Download plugin"},{"key":"masks_text_044","page":"Masks","label":"Masks · DIV · 3D preview","defaultValue":"3D preview"},{"key":"masks_text_045","page":"Masks","label":"Masks · SMALL · Mask","defaultValue":"Mask"},{"key":"masks_text_046","page":"Masks","label":"Masks · SMALL · Upgrade tier","defaultValue":"Upgrade tier"},{"key":"masks_text_047","page":"Masks","label":"Masks · SMALL · Powers","defaultValue":"Powers"},{"key":"masks_text_048","page":"Masks","label":"Masks · SMALL · Upgrade command","defaultValue":"Upgrade command"},{"key":"masks_text_049","page":"Masks","label":"Masks · SPAN · /mask upgrade","defaultValue":"/mask upgrade"},{"key":"masks_text_050","page":"Masks","label":"Masks · H2 · All masks","defaultValue":"All masks"},{"key":"masks_text_051","page":"Masks","label":"Masks · SPAN · AUTOPLAY","defaultValue":"AUTOPLAY"},{"key":"masks_text_052","page":"Masks","label":"Masks · SPAN · Pos","defaultValue":"Pos"},{"key":"masks_text_053","page":"Masks","label":"Masks · SPAN · Mask","defaultValue":"Mask"},{"key":"masks_text_054","page":"Masks","label":"Masks · SPAN · Powers","defaultValue":"Powers"},{"key":"masks_text_055","page":"Masks","label":"Masks · SPAN · Tiers","defaultValue":"Tiers"},{"key":"masks_text_056","page":"Masks","label":"Masks · H3 · Overview","defaultValue":"Overview"},{"key":"masks_text_057","page":"Masks","label":"Masks · SMALL · Selected mask","defaultValue":"Selected mask"},{"key":"masks_text_058","page":"Masks","label":"Masks · SMALL · Powers","defaultValue":"Powers"},{"key":"masks_text_059","page":"Masks","label":"Masks · B · 3","defaultValue":"3"},{"key":"masks_text_060","page":"Masks","label":"Masks · SMALL · Tiers","defaultValue":"Tiers"},{"key":"masks_text_061","page":"Masks","label":"Masks · B · 6","defaultValue":"6"},{"key":"masks_text_062","page":"Masks","label":"Masks · H2 · Straight from","defaultValue":"Straight from"},{"key":"masks_text_063","page":"Masks","label":"Masks · H2 · the server","defaultValue":"the server"},{"key":"masks_text_066","page":"Masks","label":"Masks · FOOTER · Original Minecraft plugin by Dinobeast.","defaultValue":"Original Minecraft plugin by Dinobeast."},{"key":"masks_text_067","page":"Masks","label":"Masks · A · Features","defaultValue":"Features"},{"key":"masks_text_068","page":"Masks","label":"Masks · A · Masks","defaultValue":"Masks"},{"key":"masks_text_069","page":"Masks","label":"Masks · A · Upgrading","defaultValue":"Upgrading"},{"key":"masks_text_070","page":"Masks","label":"Masks · A · Gallery","defaultValue":"Gallery"},{"key":"masks_text_071","page":"Masks","label":"Masks · A · Downloads","defaultValue":"Downloads"},{"key":"masks_text_072","page":"Masks","label":"Masks · A · FAQ","defaultValue":"FAQ"},{"key":"masks_text_073","page":"Masks","label":"Masks · A · License","defaultValue":"License"},{"key":"masks_text_074","page":"Masks","label":"Masks · A · GitHub ↗","defaultValue":"GitHub ↗"},{"key":"masks_text_075","page":"Masks","label":"Masks · SMALL · Not affiliated with Mojang or Microsoft. · ©","defaultValue":"Not affiliated with Mojang or Microsoft. · ©"},{"key":"masks_text_076","page":"Masks","label":"Masks · SMALL · 2026","defaultValue":"2026"},{"key":"masks_text_077","page":"Masks","label":"Masks · SMALL · MaskSMP. All rights reserved.","defaultValue":"MaskSMP. All rights reserved."},{"key":"upgrading_text_003","page":"Upgrading","label":"Upgrading · A · Upgrading","defaultValue":"Upgrading"},{"key":"upgrading_text_004","page":"Upgrading","label":"Upgrading · A · License","defaultValue":"License"},{"key":"upgrading_text_005","page":"Upgrading","label":"Upgrading · P · COLLECTION / PROGRESSION","defaultValue":"COLLECTION / PROGRESSION"},{"key":"upgrading_text_006","page":"Upgrading","label":"Upgrading · H1 · All masks.","defaultValue":"All masks."},{"key":"upgrading_text_007","page":"Upgrading","label":"Upgrading · H1 · Six tiers.","defaultValue":"Six tiers."},{"key":"upgrading_text_008","page":"Upgrading","label":"Upgrading · P · Explore all 16 masks, compare their real six-tier textures, and see exactly when each…","defaultValue":"Explore all 16 masks, compare their real six-tier textures, and see exactly when each ability unlocks."},{"key":"upgrading_text_009","page":"Upgrading","label":"Upgrading · SMALL · Every mask has","defaultValue":"Every mask has"},{"key":"upgrading_text_010","page":"Upgrading","label":"Upgrading · B · 3 unique powers","defaultValue":"3 unique powers"},{"key":"upgrading_text_011","page":"Upgrading","label":"Upgrading · SMALL · Upgrade with","defaultValue":"Upgrade with"},{"key":"upgrading_text_012","page":"Upgrading","label":"Upgrading · B · /mask upgrade","defaultValue":"/mask upgrade"},{"key":"upgrading_text_013","page":"Upgrading","label":"Upgrading · SMALL · Collection","defaultValue":"Collection"},{"key":"upgrading_text_014","page":"Upgrading","label":"Upgrading · B · 16 masks · 6 tiers","defaultValue":"16 masks · 6 tiers"},{"key":"upgrading_text_015","page":"Upgrading","label":"Upgrading · A · Get the plugin","defaultValue":"Get the plugin"},{"key":"upgrading_text_018","page":"Upgrading","label":"Upgrading · P · MADE FOR YOUR SMP","defaultValue":"MADE FOR YOUR SMP"},{"key":"upgrading_text_019","page":"Upgrading","label":"Upgrading · H2 · Build your","defaultValue":"Build your"},{"key":"upgrading_text_020","page":"Upgrading","label":"Upgrading · H2 · own story.","defaultValue":"own story."},{"key":"upgrading_text_021","page":"Upgrading","label":"Upgrading · P · Distinct masks, individual powers and a clear progression system — brought together i…","defaultValue":"Distinct masks, individual powers and a clear progression system — brought together in a website where every part has its own page."},{"key":"upgrading_text_022","page":"Upgrading","label":"Upgrading · A · 01 / FEATURES","defaultValue":"01 / FEATURES"},{"key":"upgrading_text_023","page":"Upgrading","label":"Upgrading · A · More ways to play","defaultValue":"More ways to play"},{"key":"upgrading_text_024","page":"Upgrading","label":"Upgrading · P · Discover the core systems behind MaskSMP.","defaultValue":"Discover the core systems behind MaskSMP."},{"key":"upgrading_text_025","page":"Upgrading","label":"Upgrading · A · Explore features ↗","defaultValue":"Explore features ↗"},{"key":"upgrading_text_026","page":"Upgrading","label":"Upgrading · A · 02 / MASKS","defaultValue":"02 / MASKS"},{"key":"upgrading_text_027","page":"Upgrading","label":"Upgrading · A · Find your mask","defaultValue":"Find your mask"},{"key":"upgrading_text_028","page":"Upgrading","label":"Upgrading · P · Browse the collection in the interactive 3D builder.","defaultValue":"Browse the collection in the interactive 3D builder."},{"key":"upgrading_text_029","page":"Upgrading","label":"Upgrading · A · Open mask builder ↗","defaultValue":"Open mask builder ↗"},{"key":"upgrading_text_030","page":"Upgrading","label":"Upgrading · A · 03 / UPGRADING","defaultValue":"03 / UPGRADING"},{"key":"upgrading_text_031","page":"Upgrading","label":"Upgrading · A · Keep progressing","defaultValue":"Keep progressing"},{"key":"upgrading_text_032","page":"Upgrading","label":"Upgrading · P · Compare mask abilities and preview the six-tier upgrade path.","defaultValue":"Compare mask abilities and preview the six-tier upgrade path."},{"key":"upgrading_text_033","page":"Upgrading","label":"Upgrading · A · View progression ↗","defaultValue":"View progression ↗"},{"key":"upgrading_text_034","page":"Upgrading","label":"Upgrading · P · READY TO TRY IT?","defaultValue":"READY TO TRY IT?"},{"key":"upgrading_text_035","page":"Upgrading","label":"Upgrading · H2 · Choose your version.","defaultValue":"Choose your version."},{"key":"upgrading_text_036","page":"Upgrading","label":"Upgrading · P · Select the plugin release that matches your Minecraft server.","defaultValue":"Select the plugin release that matches your Minecraft server."},{"key":"upgrading_text_037","page":"Upgrading","label":"Upgrading · A · Open downloads","defaultValue":"Open downloads"},{"key":"upgrading_text_038","page":"Upgrading","label":"Upgrading · A · Open on Modrinth","defaultValue":"Open on Modrinth"},{"key":"upgrading_text_039","page":"Upgrading","label":"Upgrading · H2 · Mask","defaultValue":"Mask"},{"key":"upgrading_text_040","page":"Upgrading","label":"Upgrading · H2 · builder","defaultValue":"builder"},{"key":"upgrading_text_041","page":"Upgrading","label":"Upgrading · P · Create the loadout of your dreams.","defaultValue":"Create the loadout of your dreams."},{"key":"upgrading_text_042","page":"Upgrading","label":"Upgrading · SMALL · Powers unlocked","defaultValue":"Powers unlocked"},{"key":"upgrading_text_043","page":"Upgrading","label":"Upgrading · A · Download plugin","defaultValue":"Download plugin"},{"key":"upgrading_text_044","page":"Upgrading","label":"Upgrading · DIV · 3D preview","defaultValue":"3D preview"},{"key":"upgrading_text_045","page":"Upgrading","label":"Upgrading · SMALL · Mask","defaultValue":"Mask"},{"key":"upgrading_text_046","page":"Upgrading","label":"Upgrading · SMALL · Upgrade tier","defaultValue":"Upgrade tier"},{"key":"upgrading_text_047","page":"Upgrading","label":"Upgrading · SMALL · Powers","defaultValue":"Powers"},{"key":"upgrading_text_048","page":"Upgrading","label":"Upgrading · SMALL · Upgrade command","defaultValue":"Upgrade command"},{"key":"upgrading_text_049","page":"Upgrading","label":"Upgrading · SPAN · /mask upgrade","defaultValue":"/mask upgrade"},{"key":"upgrading_text_050","page":"Upgrading","label":"Upgrading · H2 · All masks","defaultValue":"All masks"},{"key":"upgrading_text_051","page":"Upgrading","label":"Upgrading · SPAN · AUTOPLAY","defaultValue":"AUTOPLAY"},{"key":"upgrading_text_052","page":"Upgrading","label":"Upgrading · SPAN · Pos","defaultValue":"Pos"},{"key":"upgrading_text_053","page":"Upgrading","label":"Upgrading · SPAN · Mask","defaultValue":"Mask"},{"key":"upgrading_text_054","page":"Upgrading","label":"Upgrading · SPAN · Powers","defaultValue":"Powers"},{"key":"upgrading_text_055","page":"Upgrading","label":"Upgrading · SPAN · Tiers","defaultValue":"Tiers"},{"key":"upgrading_text_056","page":"Upgrading","label":"Upgrading · H3 · Overview","defaultValue":"Overview"},{"key":"upgrading_text_057","page":"Upgrading","label":"Upgrading · SMALL · Selected mask","defaultValue":"Selected mask"},{"key":"upgrading_text_058","page":"Upgrading","label":"Upgrading · SMALL · Powers","defaultValue":"Powers"},{"key":"upgrading_text_059","page":"Upgrading","label":"Upgrading · B · 3","defaultValue":"3"},{"key":"upgrading_text_060","page":"Upgrading","label":"Upgrading · SMALL · Tiers","defaultValue":"Tiers"},{"key":"upgrading_text_061","page":"Upgrading","label":"Upgrading · B · 6","defaultValue":"6"},{"key":"upgrading_text_062","page":"Upgrading","label":"Upgrading · H2 · Straight from","defaultValue":"Straight from"},{"key":"upgrading_text_063","page":"Upgrading","label":"Upgrading · H2 · the server","defaultValue":"the server"},{"key":"upgrading_text_066","page":"Upgrading","label":"Upgrading · P · PROGRESSION SYSTEM","defaultValue":"PROGRESSION SYSTEM"},{"key":"upgrading_text_067","page":"Upgrading","label":"Upgrading · H2 · Six tiers.","defaultValue":"Six tiers."},{"key":"upgrading_text_068","page":"Upgrading","label":"Upgrading · H2 · One more step.","defaultValue":"One more step."},{"key":"upgrading_text_069","page":"Upgrading","label":"Upgrading · P · Every mask has six individual resource-pack textures, so the colour bands and finish …","defaultValue":"Every mask has six individual resource-pack textures, so the colour bands and finish can change from tier to tier. Select a mask and choose any tier to compare the real artwork. Abilities unlock at Tiers 1, 3 and 6; exact costs and behaviour depend on the server configuration."},{"key":"upgrading_text_070","page":"Upgrading","label":"Upgrading · SPAN · IN-GAME COMMAND","defaultValue":"IN-GAME COMMAND"},{"key":"upgrading_text_071","page":"Upgrading","label":"Upgrading · CODE · /mask upgrade","defaultValue":"/mask upgrade"},{"key":"upgrading_text_072","page":"Upgrading","label":"Upgrading · P · Run this command on a server where MaskSMP is installed.","defaultValue":"Run this command on a server where MaskSMP is installed."},{"key":"upgrading_text_073","page":"Upgrading","label":"Upgrading · A · Open the 3D mask builder ↗","defaultValue":"Open the 3D mask builder ↗"},{"key":"upgrading_text_074","page":"Upgrading","label":"Upgrading · A · View all features ↗","defaultValue":"View all features ↗"},{"key":"upgrading_text_075","page":"Upgrading","label":"Upgrading · A · Choose a plugin version ↓","defaultValue":"Choose a plugin version ↓"},{"key":"upgrading_text_076","page":"Upgrading","label":"Upgrading · FOOTER · Original Minecraft plugin by Dinobeast.","defaultValue":"Original Minecraft plugin by Dinobeast."},{"key":"upgrading_text_077","page":"Upgrading","label":"Upgrading · A · Features","defaultValue":"Features"},{"key":"upgrading_text_078","page":"Upgrading","label":"Upgrading · A · Masks","defaultValue":"Masks"},{"key":"upgrading_text_079","page":"Upgrading","label":"Upgrading · A · Upgrading","defaultValue":"Upgrading"},{"key":"upgrading_text_080","page":"Upgrading","label":"Upgrading · A · Gallery","defaultValue":"Gallery"},{"key":"upgrading_text_081","page":"Upgrading","label":"Upgrading · A · Downloads","defaultValue":"Downloads"},{"key":"upgrading_text_082","page":"Upgrading","label":"Upgrading · A · FAQ","defaultValue":"FAQ"},{"key":"upgrading_text_083","page":"Upgrading","label":"Upgrading · A · License","defaultValue":"License"},{"key":"upgrading_text_084","page":"Upgrading","label":"Upgrading · A · GitHub ↗","defaultValue":"GitHub ↗"},{"key":"upgrading_text_085","page":"Upgrading","label":"Upgrading · SMALL · Not affiliated with Mojang or Microsoft. · ©","defaultValue":"Not affiliated with Mojang or Microsoft. · ©"},{"key":"upgrading_text_086","page":"Upgrading","label":"Upgrading · SMALL · 2026","defaultValue":"2026"},{"key":"upgrading_text_087","page":"Upgrading","label":"Upgrading · SMALL · MaskSMP. All rights reserved.","defaultValue":"MaskSMP. All rights reserved."},{"key":"gallery_text_003","page":"Gallery","label":"Gallery · A · Upgrading","defaultValue":"Upgrading"},{"key":"gallery_text_004","page":"Gallery","label":"Gallery · A · License","defaultValue":"License"},{"key":"gallery_text_005","page":"Gallery","label":"Gallery · P · IN-GAME GALLERY","defaultValue":"IN-GAME GALLERY"},{"key":"gallery_text_006","page":"Gallery","label":"Gallery · H1 · Straight from","defaultValue":"Straight from"},{"key":"gallery_text_007","page":"Gallery","label":"Gallery · H1 · the server.","defaultValue":"the server."},{"key":"gallery_text_008","page":"Gallery","label":"Gallery · P · See the MaskSMP visuals and screenshots from your server. Select an image to view it …","defaultValue":"See the MaskSMP visuals and screenshots from your server. Select an image to view it in a larger format."},{"key":"gallery_text_009","page":"Gallery","label":"Gallery · SMALL · Every mask has","defaultValue":"Every mask has"},{"key":"gallery_text_010","page":"Gallery","label":"Gallery · B · 3 unique powers","defaultValue":"3 unique powers"},{"key":"gallery_text_011","page":"Gallery","label":"Gallery · SMALL · Upgrade with","defaultValue":"Upgrade with"},{"key":"gallery_text_012","page":"Gallery","label":"Gallery · B · /mask upgrade","defaultValue":"/mask upgrade"},{"key":"gallery_text_013","page":"Gallery","label":"Gallery · SMALL · Collection","defaultValue":"Collection"},{"key":"gallery_text_014","page":"Gallery","label":"Gallery · B · 16 masks · 6 tiers","defaultValue":"16 masks · 6 tiers"},{"key":"gallery_text_015","page":"Gallery","label":"Gallery · A · Get the plugin","defaultValue":"Get the plugin"},{"key":"gallery_text_018","page":"Gallery","label":"Gallery · P · MADE FOR YOUR SMP","defaultValue":"MADE FOR YOUR SMP"},{"key":"gallery_text_019","page":"Gallery","label":"Gallery · H2 · Build your","defaultValue":"Build your"},{"key":"gallery_text_020","page":"Gallery","label":"Gallery · H2 · own story.","defaultValue":"own story."},{"key":"gallery_text_021","page":"Gallery","label":"Gallery · P · Distinct masks, individual powers and a clear progression system — brought together i…","defaultValue":"Distinct masks, individual powers and a clear progression system — brought together in a website where every part has its own page."},{"key":"gallery_text_022","page":"Gallery","label":"Gallery · A · 01 / FEATURES","defaultValue":"01 / FEATURES"},{"key":"gallery_text_023","page":"Gallery","label":"Gallery · A · More ways to play","defaultValue":"More ways to play"},{"key":"gallery_text_024","page":"Gallery","label":"Gallery · P · Discover the core systems behind MaskSMP.","defaultValue":"Discover the core systems behind MaskSMP."},{"key":"gallery_text_025","page":"Gallery","label":"Gallery · A · Explore features ↗","defaultValue":"Explore features ↗"},{"key":"gallery_text_026","page":"Gallery","label":"Gallery · A · 02 / MASKS","defaultValue":"02 / MASKS"},{"key":"gallery_text_027","page":"Gallery","label":"Gallery · A · Find your mask","defaultValue":"Find your mask"},{"key":"gallery_text_028","page":"Gallery","label":"Gallery · P · Browse the collection in the interactive 3D builder.","defaultValue":"Browse the collection in the interactive 3D builder."},{"key":"gallery_text_029","page":"Gallery","label":"Gallery · A · Open mask builder ↗","defaultValue":"Open mask builder ↗"},{"key":"gallery_text_030","page":"Gallery","label":"Gallery · A · 03 / UPGRADING","defaultValue":"03 / UPGRADING"},{"key":"gallery_text_031","page":"Gallery","label":"Gallery · A · Keep progressing","defaultValue":"Keep progressing"},{"key":"gallery_text_032","page":"Gallery","label":"Gallery · P · Compare mask abilities and preview the six-tier upgrade path.","defaultValue":"Compare mask abilities and preview the six-tier upgrade path."},{"key":"gallery_text_033","page":"Gallery","label":"Gallery · A · View progression ↗","defaultValue":"View progression ↗"},{"key":"gallery_text_034","page":"Gallery","label":"Gallery · P · READY TO TRY IT?","defaultValue":"READY TO TRY IT?"},{"key":"gallery_text_035","page":"Gallery","label":"Gallery · H2 · Choose your version.","defaultValue":"Choose your version."},{"key":"gallery_text_036","page":"Gallery","label":"Gallery · P · Select the plugin release that matches your Minecraft server.","defaultValue":"Select the plugin release that matches your Minecraft server."},{"key":"gallery_text_037","page":"Gallery","label":"Gallery · A · Open downloads","defaultValue":"Open downloads"},{"key":"gallery_text_038","page":"Gallery","label":"Gallery · A · Open on Modrinth","defaultValue":"Open on Modrinth"},{"key":"gallery_text_039","page":"Gallery","label":"Gallery · H2 · Mask","defaultValue":"Mask"},{"key":"gallery_text_040","page":"Gallery","label":"Gallery · H2 · builder","defaultValue":"builder"},{"key":"gallery_text_041","page":"Gallery","label":"Gallery · P · Create the loadout of your dreams.","defaultValue":"Create the loadout of your dreams."},{"key":"gallery_text_042","page":"Gallery","label":"Gallery · SMALL · Powers unlocked","defaultValue":"Powers unlocked"},{"key":"gallery_text_043","page":"Gallery","label":"Gallery · A · Download plugin","defaultValue":"Download plugin"},{"key":"gallery_text_044","page":"Gallery","label":"Gallery · DIV · 3D preview","defaultValue":"3D preview"},{"key":"gallery_text_045","page":"Gallery","label":"Gallery · SMALL · Mask","defaultValue":"Mask"},{"key":"gallery_text_046","page":"Gallery","label":"Gallery · SMALL · Upgrade tier","defaultValue":"Upgrade tier"},{"key":"gallery_text_047","page":"Gallery","label":"Gallery · SMALL · Powers","defaultValue":"Powers"},{"key":"gallery_text_048","page":"Gallery","label":"Gallery · SMALL · Upgrade command","defaultValue":"Upgrade command"},{"key":"gallery_text_049","page":"Gallery","label":"Gallery · SPAN · /mask upgrade","defaultValue":"/mask upgrade"},{"key":"gallery_text_050","page":"Gallery","label":"Gallery · H2 · All masks","defaultValue":"All masks"},{"key":"gallery_text_051","page":"Gallery","label":"Gallery · SPAN · AUTOPLAY","defaultValue":"AUTOPLAY"},{"key":"gallery_text_052","page":"Gallery","label":"Gallery · SPAN · Pos","defaultValue":"Pos"},{"key":"gallery_text_053","page":"Gallery","label":"Gallery · SPAN · Mask","defaultValue":"Mask"},{"key":"gallery_text_054","page":"Gallery","label":"Gallery · SPAN · Powers","defaultValue":"Powers"},{"key":"gallery_text_055","page":"Gallery","label":"Gallery · SPAN · Tiers","defaultValue":"Tiers"},{"key":"gallery_text_056","page":"Gallery","label":"Gallery · H3 · Overview","defaultValue":"Overview"},{"key":"gallery_text_057","page":"Gallery","label":"Gallery · SMALL · Selected mask","defaultValue":"Selected mask"},{"key":"gallery_text_058","page":"Gallery","label":"Gallery · SMALL · Powers","defaultValue":"Powers"},{"key":"gallery_text_059","page":"Gallery","label":"Gallery · B · 3","defaultValue":"3"},{"key":"gallery_text_060","page":"Gallery","label":"Gallery · SMALL · Tiers","defaultValue":"Tiers"},{"key":"gallery_text_061","page":"Gallery","label":"Gallery · B · 6","defaultValue":"6"},{"key":"gallery_text_062","page":"Gallery","label":"Gallery · DIV · Selected","defaultValue":"Selected"},{"key":"gallery_text_063","page":"Gallery","label":"Gallery · H2 · Straight from","defaultValue":"Straight from"},{"key":"gallery_text_064","page":"Gallery","label":"Gallery · H2 · the server","defaultValue":"the server"},{"key":"gallery_text_067","page":"Gallery","label":"Gallery · FOOTER · Original Minecraft plugin by Dinobeast.","defaultValue":"Original Minecraft plugin by Dinobeast."},{"key":"gallery_text_068","page":"Gallery","label":"Gallery · A · Features","defaultValue":"Features"},{"key":"gallery_text_069","page":"Gallery","label":"Gallery · A · Masks","defaultValue":"Masks"},{"key":"gallery_text_070","page":"Gallery","label":"Gallery · A · Upgrading","defaultValue":"Upgrading"},{"key":"gallery_text_071","page":"Gallery","label":"Gallery · A · Gallery","defaultValue":"Gallery"},{"key":"gallery_text_072","page":"Gallery","label":"Gallery · A · Downloads","defaultValue":"Downloads"},{"key":"gallery_text_073","page":"Gallery","label":"Gallery · A · FAQ","defaultValue":"FAQ"},{"key":"gallery_text_074","page":"Gallery","label":"Gallery · A · License","defaultValue":"License"},{"key":"gallery_text_075","page":"Gallery","label":"Gallery · A · GitHub ↗","defaultValue":"GitHub ↗"},{"key":"gallery_text_076","page":"Gallery","label":"Gallery · SMALL · Not affiliated with Mojang or Microsoft. · ©","defaultValue":"Not affiliated with Mojang or Microsoft. · ©"},{"key":"gallery_text_077","page":"Gallery","label":"Gallery · SMALL · 2026","defaultValue":"2026"},{"key":"gallery_text_078","page":"Gallery","label":"Gallery · SMALL · MaskSMP. All rights reserved.","defaultValue":"MaskSMP. All rights reserved."},{"key":"downloads_text_003","page":"Downloads","label":"Downloads · A · Upgrading","defaultValue":"Upgrading"},{"key":"downloads_text_004","page":"Downloads","label":"Downloads · A · License","defaultValue":"License"},{"key":"downloads_text_005","page":"Downloads","label":"Downloads · H1 · Choose your","defaultValue":"Choose your"},{"key":"downloads_text_006","page":"Downloads","label":"Downloads · H1 · version.","defaultValue":"version."},{"key":"downloads_text_007","page":"Downloads","label":"Downloads · SPAN · JAR","defaultValue":"JAR"},{"key":"downloads_text_008","page":"Downloads","label":"Downloads · SPAN · 01 / PLUGIN","defaultValue":"01 / PLUGIN"},{"key":"downloads_text_009","page":"Downloads","label":"Downloads · A · Download latest version","defaultValue":"Download latest version"},{"key":"downloads_text_010","page":"Downloads","label":"Downloads · P · Add plugin versions in the admin panel.","defaultValue":"Add plugin versions in the admin panel."},{"key":"downloads_text_011","page":"Downloads","label":"Downloads · P · plugin download starts","defaultValue":"plugin download starts"},{"key":"downloads_text_012","page":"Downloads","label":"Downloads · SUMMARY · Other versions","defaultValue":"Other versions"},{"key":"downloads_text_013","page":"Downloads","label":"Downloads · P · The newest release is shown first. Open “Other versions” to choose an older release.","defaultValue":"The newest release is shown first. Open “Other versions” to choose an older release."},{"key":"downloads_text_014","page":"Downloads","label":"Downloads · SPAN · ZIP","defaultValue":"ZIP"},{"key":"downloads_text_015","page":"Downloads","label":"Downloads · SPAN · 02 / RESOURCE PACK","defaultValue":"02 / RESOURCE PACK"},{"key":"downloads_text_016","page":"Downloads","label":"Downloads · A · Download latest resource pack","defaultValue":"Download latest resource pack"},{"key":"downloads_text_017","page":"Downloads","label":"Downloads · P · Add resource packs in the admin panel.","defaultValue":"Add resource packs in the admin panel."},{"key":"downloads_text_018","page":"Downloads","label":"Downloads · P · resource-pack download starts","defaultValue":"resource-pack download starts"},{"key":"downloads_text_019","page":"Downloads","label":"Downloads · SUMMARY · Other versions","defaultValue":"Other versions"},{"key":"downloads_text_020","page":"Downloads","label":"Downloads · P · Use the matching pack to see the custom models and textures in-game.","defaultValue":"Use the matching pack to see the custom models and textures in-game."},{"key":"downloads_text_021","page":"Downloads","label":"Downloads · P · Shared counts update when a download starts. The website cannot verify whether the br…","defaultValue":"Shared counts update when a download starts. The website cannot verify whether the browser finished saving the file."},{"key":"downloads_text_022","page":"Downloads","label":"Downloads · P · THREE QUICK STEPS","defaultValue":"THREE QUICK STEPS"},{"key":"downloads_text_023","page":"Downloads","label":"Downloads · H2 · Ready for","defaultValue":"Ready for"},{"key":"downloads_text_024","page":"Downloads","label":"Downloads · H2 · your server?","defaultValue":"your server?"},{"key":"downloads_text_025","page":"Downloads","label":"Downloads · P · Keep the plugin and the resource pack together for the complete MaskSMP experience.","defaultValue":"Keep the plugin and the resource pack together for the complete MaskSMP experience."},{"key":"downloads_text_026","page":"Downloads","label":"Downloads · SPAN · 01","defaultValue":"01"},{"key":"downloads_text_027","page":"Downloads","label":"Downloads · H3 · Choose your files","defaultValue":"Choose your files"},{"key":"downloads_text_028","page":"Downloads","label":"Downloads · P · Download the plugin release and the matching resource pack version.","defaultValue":"Download the plugin release and the matching resource pack version."},{"key":"downloads_text_029","page":"Downloads","label":"Downloads · SPAN · 02","defaultValue":"02"},{"key":"downloads_text_030","page":"Downloads","label":"Downloads · H3 · Install the plugin","defaultValue":"Install the plugin"},{"key":"downloads_text_031","page":"Downloads","label":"Downloads · P · Place the","defaultValue":"Place the"},{"key":"downloads_text_032","page":"Downloads","label":"Downloads · P · .jar","defaultValue":".jar"},{"key":"downloads_text_033","page":"Downloads","label":"Downloads · P · file in your server’s","defaultValue":"file in your server’s"},{"key":"downloads_text_034","page":"Downloads","label":"Downloads · P · plugins","defaultValue":"plugins"},{"key":"downloads_text_035","page":"Downloads","label":"Downloads · P · folder, then restart the server.","defaultValue":"folder, then restart the server."},{"key":"downloads_text_036","page":"Downloads","label":"Downloads · SPAN · 03","defaultValue":"03"},{"key":"downloads_text_037","page":"Downloads","label":"Downloads · H3 · Apply the pack","defaultValue":"Apply the pack"},{"key":"downloads_text_038","page":"Downloads","label":"Downloads · P · Configure the resource pack for your Minecraft server so custom mask textures and UI …","defaultValue":"Configure the resource pack for your Minecraft server so custom mask textures and UI assets can appear."},{"key":"downloads_text_039","page":"Downloads","label":"Downloads · P · MASKSMP DOWNLOADS","defaultValue":"MASKSMP DOWNLOADS"},{"key":"downloads_text_040","page":"Downloads","label":"Downloads · H2 · Thanks for downloading!","defaultValue":"Thanks for downloading!"},{"key":"downloads_text_041","page":"Downloads","label":"Downloads · BUTTON · Continue browsing","defaultValue":"Continue browsing"},{"key":"downloads_text_042","page":"Downloads","label":"Downloads · SMALL · Need the other file? You can download it from this page too.","defaultValue":"Need the other file? You can download it from this page too."},{"key":"downloads_text_043","page":"Downloads","label":"Downloads · FOOTER · Original Minecraft plugin by Dinobeast.","defaultValue":"Original Minecraft plugin by Dinobeast."},{"key":"downloads_text_044","page":"Downloads","label":"Downloads · A · Features","defaultValue":"Features"},{"key":"downloads_text_045","page":"Downloads","label":"Downloads · A · Masks","defaultValue":"Masks"},{"key":"downloads_text_046","page":"Downloads","label":"Downloads · A · Upgrading","defaultValue":"Upgrading"},{"key":"downloads_text_047","page":"Downloads","label":"Downloads · A · Gallery","defaultValue":"Gallery"},{"key":"downloads_text_048","page":"Downloads","label":"Downloads · A · Downloads","defaultValue":"Downloads"},{"key":"downloads_text_049","page":"Downloads","label":"Downloads · A · FAQ","defaultValue":"FAQ"},{"key":"downloads_text_050","page":"Downloads","label":"Downloads · A · License","defaultValue":"License"},{"key":"downloads_text_051","page":"Downloads","label":"Downloads · A · GitHub ↗","defaultValue":"GitHub ↗"},{"key":"downloads_text_052","page":"Downloads","label":"Downloads · SMALL · Not affiliated with Mojang or Microsoft. · ©","defaultValue":"Not affiliated with Mojang or Microsoft. · ©"},{"key":"downloads_text_053","page":"Downloads","label":"Downloads · SMALL · 2026","defaultValue":"2026"},{"key":"downloads_text_054","page":"Downloads","label":"Downloads · SMALL · MaskSMP. All rights reserved.","defaultValue":"MaskSMP. All rights reserved."},{"key":"faq_text_003","page":"FAQ","label":"FAQ · A · Upgrading","defaultValue":"Upgrading"},{"key":"faq_text_004","page":"FAQ","label":"FAQ · A · License","defaultValue":"License"},{"key":"faq_text_005","page":"FAQ","label":"FAQ · P · MASKSMP / HELP CENTER","defaultValue":"MASKSMP / HELP CENTER"},{"key":"faq_text_006","page":"FAQ","label":"FAQ · H1 · Frequently asked","defaultValue":"Frequently asked"},{"key":"faq_text_007","page":"FAQ","label":"FAQ · H1 · questions.","defaultValue":"questions."},{"key":"faq_text_008","page":"FAQ","label":"FAQ · P · Quick answers about MaskSMP, its masks, upgrades, downloads, and resource pack.","defaultValue":"Quick answers about MaskSMP, its masks, upgrades, downloads, and resource pack."},{"key":"faq_text_009","page":"FAQ","label":"FAQ · P · NEED AN ANSWER?","defaultValue":"NEED AN ANSWER?"},{"key":"faq_text_010","page":"FAQ","label":"FAQ · H2 · Good to","defaultValue":"Good to"},{"key":"faq_text_011","page":"FAQ","label":"FAQ · H2 · know.","defaultValue":"know."},{"key":"faq_text_012","page":"FAQ","label":"FAQ · P · Open a question to read the answer. Some answers may also include a video walkthrough.","defaultValue":"Open a question to read the answer. Some answers may also include a video walkthrough."},{"key":"faq_text_013","page":"FAQ","label":"FAQ · H3 · No questions published yet","defaultValue":"No questions published yet"},{"key":"faq_text_014","page":"FAQ","label":"FAQ · P · Frequently asked questions will appear here once they are added through the website a…","defaultValue":"Frequently asked questions will appear here once they are added through the website admin panel."},{"key":"faq_text_015","page":"FAQ","label":"FAQ · P · READY TO GET STARTED?","defaultValue":"READY TO GET STARTED?"},{"key":"faq_text_016","page":"FAQ","label":"FAQ · H2 · Need the files?","defaultValue":"Need the files?"},{"key":"faq_text_017","page":"FAQ","label":"FAQ · P · Get the plugin and matching resource pack from the Downloads page.","defaultValue":"Get the plugin and matching resource pack from the Downloads page."},{"key":"faq_text_018","page":"FAQ","label":"FAQ · A · Go to downloads","defaultValue":"Go to downloads"},{"key":"faq_text_019","page":"FAQ","label":"FAQ · FOOTER · Original Minecraft plugin by Dinobeast.","defaultValue":"Original Minecraft plugin by Dinobeast."},{"key":"faq_text_020","page":"FAQ","label":"FAQ · A · Features","defaultValue":"Features"},{"key":"faq_text_021","page":"FAQ","label":"FAQ · A · Masks","defaultValue":"Masks"},{"key":"faq_text_022","page":"FAQ","label":"FAQ · A · Upgrading","defaultValue":"Upgrading"},{"key":"faq_text_023","page":"FAQ","label":"FAQ · A · Gallery","defaultValue":"Gallery"},{"key":"faq_text_024","page":"FAQ","label":"FAQ · A · Downloads","defaultValue":"Downloads"},{"key":"faq_text_025","page":"FAQ","label":"FAQ · A · FAQ","defaultValue":"FAQ"},{"key":"faq_text_026","page":"FAQ","label":"FAQ · A · License","defaultValue":"License"},{"key":"faq_text_027","page":"FAQ","label":"FAQ · A · GitHub ↗","defaultValue":"GitHub ↗"},{"key":"faq_text_028","page":"FAQ","label":"FAQ · SMALL · Not affiliated with Mojang or Microsoft. · ©","defaultValue":"Not affiliated with Mojang or Microsoft. · ©"},{"key":"faq_text_029","page":"FAQ","label":"FAQ · SMALL · 2026","defaultValue":"2026"},{"key":"faq_text_030","page":"FAQ","label":"FAQ · SMALL · MaskSMP. All rights reserved.","defaultValue":"MaskSMP. All rights reserved."},{"key":"license_text_003","page":"License","label":"License · A · Upgrading","defaultValue":"Upgrading"},{"key":"license_text_004","page":"License","label":"License · A · License","defaultValue":"License"},{"key":"license_text_005","page":"License","label":"License · SMALL · Project terms","defaultValue":"Project terms"},{"key":"license_text_006","page":"License","label":"License · H2 · MaskSMP license","defaultValue":"MaskSMP license"},{"key":"license_text_007","page":"License","label":"License · P · This page explains what you may and may not do with the MaskSMP plugin under the proj…","defaultValue":"This page explains what you may and may not do with the MaskSMP plugin under the project's current license."},{"key":"license_text_008","page":"License","label":"License · H3 · Permitted use","defaultValue":"Permitted use"},{"key":"license_text_009","page":"License","label":"License · B · What you are allowed to do","defaultValue":"What you are allowed to do"},{"key":"license_text_010","page":"License","label":"License · LI · Use the MaskSMP plugin on your own Minecraft server.","defaultValue":"Use the MaskSMP plugin on your own Minecraft server."},{"key":"license_text_011","page":"License","label":"License · LI · Install and run the plugin for personal use or server use.","defaultValue":"Install and run the plugin for personal use or server use."},{"key":"license_text_012","page":"License","label":"License · H3 · Restrictions","defaultValue":"Restrictions"},{"key":"license_text_013","page":"License","label":"License · B · What you are not allowed to do","defaultValue":"What you are not allowed to do"},{"key":"license_text_014","page":"License","label":"License · LI · Copy or reproduce the plugin's source code.","defaultValue":"Copy or reproduce the plugin's source code."},{"key":"license_text_015","page":"License","label":"License · LI · Use the source code or substantial parts of it in another plugin.","defaultValue":"Use the source code or substantial parts of it in another plugin."},{"key":"license_text_016","page":"License","label":"License · LI · Re-upload or redistribute the plugin.","defaultValue":"Re-upload or redistribute the plugin."},{"key":"license_text_017","page":"License","label":"License · LI · Sell, resell or commercially redistribute the plugin.","defaultValue":"Sell, resell or commercially redistribute the plugin."},{"key":"license_text_018","page":"License","label":"License · LI · Modify and distribute the plugin or its source code.","defaultValue":"Modify and distribute the plugin or its source code."},{"key":"license_text_019","page":"License","label":"License · LI · Claim the plugin or any part of its source code as your own.","defaultValue":"Claim the plugin or any part of its source code as your own."},{"key":"license_text_020","page":"License","label":"License · H3 · Ownership & agreement","defaultValue":"Ownership & agreement"},{"key":"license_text_021","page":"License","label":"License · B · Ownership remains with the original authors","defaultValue":"Ownership remains with the original authors"},{"key":"license_text_022","page":"License","label":"License · P · All rights, title and interest in the MaskSMP plugin and its source code remain with …","defaultValue":"All rights, title and interest in the MaskSMP plugin and its source code remain with the original authors: MrGold and Dinobeast."},{"key":"license_text_023","page":"License","label":"License · P · By downloading, installing or using the MaskSMP plugin, you agree to these license te…","defaultValue":"By downloading, installing or using the MaskSMP plugin, you agree to these license terms. For permission to use the plugin outside these terms, contact the original authors."},{"key":"license_text_024","page":"License","label":"License · A · Back to downloads ↓","defaultValue":"Back to downloads ↓"},{"key":"license_text_025","page":"License","label":"License · A · Read plain-text license","defaultValue":"Read plain-text license"},{"key":"license_text_026","page":"License","label":"License · A · August 10, 2026 version on GitHub ↗","defaultValue":"August 10, 2026 version on GitHub ↗"},{"key":"license_text_027","page":"License","label":"License · FOOTER · Original Minecraft plugin by Dinobeast.","defaultValue":"Original Minecraft plugin by Dinobeast."},{"key":"license_text_028","page":"License","label":"License · A · Features","defaultValue":"Features"},{"key":"license_text_029","page":"License","label":"License · A · Masks","defaultValue":"Masks"},{"key":"license_text_030","page":"License","label":"License · A · Upgrading","defaultValue":"Upgrading"},{"key":"license_text_031","page":"License","label":"License · A · Gallery","defaultValue":"Gallery"},{"key":"license_text_032","page":"License","label":"License · A · Downloads","defaultValue":"Downloads"},{"key":"license_text_033","page":"License","label":"License · A · FAQ","defaultValue":"FAQ"},{"key":"license_text_034","page":"License","label":"License · A · License","defaultValue":"License"},{"key":"license_text_035","page":"License","label":"License · A · GitHub ↗","defaultValue":"GitHub ↗"},{"key":"license_text_036","page":"License","label":"License · SMALL · Not affiliated with Mojang or Microsoft. · ©","defaultValue":"Not affiliated with Mojang or Microsoft. · ©"},{"key":"license_text_037","page":"License","label":"License · SMALL · 2026","defaultValue":"2026"},{"key":"license_text_038","page":"License","label":"License · SMALL · MaskSMP. All rights reserved.","defaultValue":"MaskSMP. All rights reserved."}];
  const fields = ["siteName", "heroEyebrow", "heroTitle", "heroAccent", "heroDescription", "pluginDescription", "trailerVideoUrl", "trailerComingSoon", "logoTheme", "serverIp", "discordUrl", "contactUrl", "modrinthUrl", "navHomeText", "navMasksText", "navDownloadsText", "navFaqText", "navFeaturesText", "navGalleryText", "navPluginText", "heroDownloadText", "heroMasksText", "heroMetaOne", "heroMetaTwo", "heroMetaThree", "trustOne", "trustTwo", "trustThree", "trustFour", "featuresEyebrow", "featuresTitleOne", "featuresTitleTwo", "featuresIntro", "featureOneTitle", "featureOneText", "featureOneLink", "featureTwoTitle", "featureTwoText", "featureTwoLink", "featureThreeTitle", "featureThreeText", "featureThreeLink", "maskPreviewEyebrow", "maskPreviewTitle", "maskPreviewLink", "galleryEyebrow", "galleryTitle", "galleryIntro", "galleryEmptyTitle", "galleryEmptyText", "pluginCtaEyebrow", "pluginInfoDownloadText", "footerTagline", "downloadsEyebrow", "downloadsTitle", "downloadsTitleAccent", "downloadsIntro", "pluginCardKicker", "pluginCardTitle", "pluginCardDescription", "pluginSelectLabel", "pluginDownloadButtonText", "packCardKicker", "packCardTitle", "packCardDescription", "packSelectLabel", "packDownloadButtonText", "modrinthEyebrow", "modrinthTitle", "modrinthDescription", "masksPageTitle", "masksPageIntro"];
  const fallback = {
      "siteName": "MaskSMP",
      "logoTheme": "purple",
      "trailerComingSoon": false,
      "downloadCounterNamespace": "masksmp-official-site-2026",
      "heroEyebrow": "MINECRAFT PLUGIN",
      "heroTitle": "Your server.",
      "heroAccent": "Your legend.",
      "heroDescription": "Bring unique masks, distinctive abilities, and an upgrade system to your Minecraft server.",
      "serverIp": "",
      "minecraftVersion": "Not set yet",
      "discordUrl": "",
      "downloadUrl": "",
      "downloadLabel": "Download the plugin",
      "pluginVersion": "Not set yet",
      "pluginDescription": "Bring the MaskSMP experience to your server.",
      "contactUrl": "",
      "modrinthUrl": "",
      "gallery": [],
      "customMasks": [],
      "faqItems": [],
      "textOverrides": {},
      "trailerVideoUrl": "",
      "pluginVersions": [],
      "resourcePacks": [],
      "navHomeText": "Home",
      "navMasksText": "Masks",
      "navDownloadsText": "Downloads",
      "navFaqText": "FAQ",
      "navFeaturesText": "Features",
      "navGalleryText": "Gallery",
      "navPluginText": "Download plugin",
      "heroDownloadText": "Download plugin",
      "heroMasksText": "Explore the masks",
      "heroMetaOne": "16 mask types",
      "heroMetaTwo": "6 upgrade tiers",
      "heroMetaThree": "Unique abilities",
      "trustOne": "BUILT FOR MINECRAFT SERVERS",
      "trustTwo": "MASK COLLECTION",
      "trustThree": "PROGRESSION SYSTEM",
      "trustFour": "YOUR PLAYSTYLE",
      "featuresEyebrow": "MAKE EVERY MASK UNIQUE",
      "featuresTitleOne": "A new way",
      "featuresTitleTwo": "to play.",
      "featuresIntro": "Give players a reason to explore, upgrade, and find their own style. MaskSMP revolves around different masks and their abilities.",
      "featureOneTitle": "Unique masks",
      "featureOneText": "Explore a collection featuring Dragon, Flame, Shadow, Storm, Ocean, Galaxy, and more.",
      "featureOneLink": "Explore the collection",
      "featureTwoTitle": "Impactful abilities",
      "featureTwoText": "Give every mask a distinct playstyle, from powerful attacks to tactical abilities.",
      "featureTwoLink": "See examples",
      "featureThreeTitle": "Upgrade your mask",
      "featureThreeText": "Progress through six tiers and let players work toward their next upgrade with /mask upgrade.",
      "featureThreeLink": "Plugin details",
      "maskPreviewEyebrow": "FIND YOUR PLAYSTYLE",
      "maskPreviewTitle": "Which mask fits your playstyle?",
      "maskPreviewLink": "All 16 masks",
      "galleryEyebrow": "IN-GAME GALLERY",
      "galleryTitle": "From your server.",
      "galleryIntro": "Screenshots you add through the admin panel will appear here after you save and publish your changes.",
      "galleryEmptyTitle": "Your screenshots will appear here",
      "galleryEmptyText": "Open the admin panel to add images.",
      "pluginCtaEyebrow": "READY TO UPGRADE YOUR SERVER?",
      "footerTagline": "Made for players who want to write their own story.",
      "pluginInfoDownloadText": "Download plugin",
      "downloadsEyebrow": "DOWNLOADS / RELEASES",
      "downloadsTitle": "Everything for your",
      "downloadsTitleAccent": "Minecraft server.",
      "downloadsIntro": "Choose the plugin version that fits your server or download a resource pack. Manage versions and files in the admin panel.",
      "pluginCardKicker": "01 / PLUGIN RELEASES",
      "pluginCardTitle": "MaskSMP Plugin",
      "pluginCardDescription": "Select a release and check which Minecraft version it supports.",
      "pluginSelectLabel": "Choose a plugin version",
      "pluginDownloadButtonText": "Download selected version",
      "packCardKicker": "02 / OPTIONAL CONTENT",
      "packCardTitle": "Resource packs",
      "packCardDescription": "Choose a resource pack for your preferred version. Files can be added through the admin panel.",
      "packSelectLabel": "Choose a resource pack",
      "packDownloadButtonText": "Download resource pack",
      "modrinthEyebrow": "ALSO AVAILABLE ON MODRINTH",
      "modrinthTitle": "Follow the official release page.",
      "modrinthDescription": "The Modrinth button takes you to the project page where you publish your plugin.",
      "masksPageTitle": "Choose your mask.",
      "masksPageIntro": "Explore the interactive 3D mask, select a type at the bottom, and discover its abilities and upgrade tiers. Drag the mask to rotate it.",
      "galleryLightboxCloseText": "Close"
  };
  const form = document.getElementById('settings-form');
  const galleryEditor = document.getElementById('gallery-editor');
  const photoInput = document.getElementById('photo-files');
  const status = document.getElementById('save-status');
  const photoCount = document.getElementById('photo-count');
  let config = { ...fallback, gallery: [], faqItems: [], pluginVersions: [], resourcePacks: [] };
  let canonical = { ...fallback, gallery: [], faqItems: [], pluginVersions: [], resourcePacks: [] };
  let dirty = false;

  function announce(message, tone='') {
    status.textContent = message;
    status.classList.remove('is-saved','is-error');
    if (tone) status.classList.add(tone);
  }
  function markDirty(message='You have unsaved changes.') { dirty = true; announce(message); }
  function normalise(value) {
    const object = value && typeof value === 'object' ? value : {};
    return {
      ...fallback, ...object,
      gallery: Array.isArray(object.gallery) ? object.gallery.filter(photo => photo && typeof photo.src === 'string') : [],
      customMasks: Array.isArray(object.customMasks) ? object.customMasks.filter(item => item && typeof item.id === 'string' && typeof item.name === 'string').map(item => ({ ...item, geometry: Array.isArray(item.geometry) ? item.geometry : [], textureData: String(item.textureData || ''), tierTextures: Array.isArray(item.tierTextures) ? item.tierTextures.slice(0,6).map(value => String(value || '')) : ['', '', '', '', '', ''], powers: Array.isArray(item.powers) ? item.powers.slice(0,3) : [] })) : [],
      pluginVersions: Array.isArray(object.pluginVersions) ? object.pluginVersions.filter(item => item && typeof item === 'object') : [],
      resourcePacks: Array.isArray(object.resourcePacks) ? object.resourcePacks.filter(item => item && typeof item === 'object') : [],
      faqItems: Array.isArray(object.faqItems) ? object.faqItems.filter(item => item && typeof item.question === 'string' && typeof item.answer === 'string').map((item, index) => ({ id: String(item.id || `faq-${index+1}`), question: String(item.question || ''), answer: String(item.answer || ''), linkUrl: String(item.linkUrl || ''), linkText: String(item.linkText || ''), videoUrl: String(item.videoUrl || '') })) : [],
      textOverrides: object.textOverrides && typeof object.textOverrides === 'object' && !Array.isArray(object.textOverrides) ? object.textOverrides : {}
    };
  }
  function openDb() {
    return new Promise((resolve, reject) => {
      if (!('indexedDB' in window)) return reject(new Error('IndexedDB is not supported in this browser.'));
      const request = indexedDB.open(DB_NAME, 1);
      request.onupgradeneeded = () => {
        if (!request.result.objectStoreNames.contains(DB_STORE)) request.result.createObjectStore(DB_STORE);
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error('Could not open browser database.'));
    });
  }
  async function dbGet(key) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readonly');
      const request = tx.objectStore(DB_STORE).get(key);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = () => reject(request.error);
      tx.oncomplete = () => db.close();
      tx.onerror = () => { db.close(); reject(tx.error); };
    });
  }
  async function dbSet(key, value) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readwrite');
      tx.objectStore(DB_STORE).put(value, key);
      tx.oncomplete = () => { db.close(); resolve(true); };
      tx.onerror = () => { const error = tx.error; db.close(); reject(error || new Error('Could not save to browser database.')); };
      tx.onabort = () => { const error = tx.error; db.close(); reject(error || new Error('Saving was cancelled.')); };
    });
  }
  async function dbDelete(key) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(DB_STORE, 'readwrite'); tx.objectStore(DB_STORE).delete(key);
      tx.oncomplete = () => { db.close(); resolve(true); };
      tx.onerror = () => { const error = tx.error; db.close(); reject(error); };
    });
  }
  async function readCanonical() {
    try {
      const response = await fetch('../site-config.json', { cache:'no-store' });
      if (response.ok) return normalise(await response.json());
    } catch (error) { /* direct file opening falls back to defaults */ }
    return normalise(fallback);
  }
  async function readLocal() {
    try {
      const value = await dbGet('siteConfig');
      if (value && typeof value === 'object') return value;
    } catch (error) { /* continue with localStorage fallback */ }
    try { const value = localStorage.getItem(STORAGE_KEY); return value ? JSON.parse(value) : null; }
    catch (error) { return null; }
  }
  function combineSavedWithPublished(saved, published) {
    if (!saved) return normalise(published);
    const combined = { ...published, ...saved };
    if (!Array.isArray(saved.gallery)) combined.gallery = published.gallery;
    if (!Array.isArray(saved.faqItems)) combined.faqItems = published.faqItems;
    const mergeAssets = (localItems, publicItems) => {
      if (!Array.isArray(localItems)) return publicItems || [];
      const source = Array.isArray(publicItems) ? publicItems : [];
      return localItems.map(item => {
        const publishedItem = source.find(candidate => candidate && item && candidate.id && candidate.id === item.id);
        return publishedItem ? { ...publishedItem, ...item, fileData: item.fileData || publishedItem.fileData || '' } : item;
      });
    };
    combined.pluginVersions = mergeAssets(saved.pluginVersions, published.pluginVersions);
    combined.resourcePacks = mergeAssets(saved.resourcePacks, published.resourcePacks);
    return normalise(combined);
  }
  function getFormConfig() {
    const formData = new FormData(form);
    const next = { ...config };
    fields.forEach(key => {
      const field = form.elements.namedItem(key);
      next[key] = field && field.type === 'checkbox' ? Boolean(field.checked) : String(formData.get(key) ?? '').trim();
    });
    next.gallery = config.gallery;
    next.customMasks = config.customMasks;
    next.faqItems = config.faqItems;
    next.pluginVersions = config.pluginVersions;
    next.resourcePacks = config.resourcePacks;
    return next;
  }
  function syncLogoThemeControls() {
    const themeField = form.elements.namedItem('logoTheme');
    const theme = themeField && themeField.value === 'yellow' ? 'yellow' : 'purple';
    const wide = theme === 'yellow' ? '../assets/masksmp-logo-wide.png' : '../assets/masksmp-logo-wide-purple.png';
    const square = theme === 'yellow' ? '../assets/masksmp-logo-square.png' : '../assets/masksmp-logo-square-purple.png';
    document.querySelectorAll('.admin-header .brand-logo').forEach(image => { image.src = wide; });
    document.querySelectorAll('.admin-login-brand img').forEach(image => { image.src = square; });
    const preview = document.getElementById('logo-theme-preview'); if (preview) preview.src = wide;
    const current = document.getElementById('logo-theme-current'); if (current) current.textContent = theme === 'yellow' ? 'Current logo: Classic Gold / Yellow' : 'Current logo: Purple / Pink';
    const toggle = document.getElementById('logo-theme-toggle'); if (toggle) toggle.textContent = theme === 'yellow' ? 'Switch to purple logo' : 'Switch to classic gold logo';
    document.querySelectorAll('link[rel="icon"][sizes="any"]').forEach(link => { link.href = theme === 'yellow' ? '../masksmp-favicon.ico?v=8' : '../masksmp-favicon-purple.ico?v=13'; });
    document.querySelectorAll('link[rel="icon"][type="image/png"], link[rel="apple-touch-icon"]').forEach(link => { link.href = theme === 'yellow' ? '../masksmp-favicon.png?v=8' : '../masksmp-favicon-purple.png?v=13'; });
    document.documentElement.dataset.logoTheme = theme;
  }
  function fillForm(value) {
    fields.forEach(key => {
      const field = form.elements.namedItem(key); if (!field) return;
      if (field.type === 'checkbox') field.checked = value[key] === true || String(value[key] || '').toLowerCase() === 'true' || String(value[key] || '').toLowerCase() === 'on';
      else field.value = value[key] ?? '';
    });
    syncLogoThemeControls();
  }
  function renderGallery() {
    galleryEditor.replaceChildren();
    photoCount.textContent = `${config.gallery.length} / ${MAX_PHOTOS} images`;
    if (!config.gallery.length) {
      const empty = document.createElement('div'); empty.className = 'admin-gallery-empty'; empty.textContent = 'There are no screenshots yet. Add images above.'; galleryEditor.append(empty); return;
    }
    config.gallery.forEach((photo, index) => {
      const card = document.createElement('article'); card.className = 'photo-card';
      const image = document.createElement('img'); image.src = photo.src; image.alt = photo.title || `Screenshot ${index+1}`; image.loading = 'lazy';
      const meta = document.createElement('div'); meta.className = 'photo-meta';
      const label = document.createElement('label'); label.textContent = `Photo title ${index+1}`; label.htmlFor = `photo-title-${index}`;
      const title = document.createElement('input'); title.id = `photo-title-${index}`; title.type = 'text'; title.maxLength = 90; title.value = photo.title || ''; title.placeholder = 'e.g. Dragon ability in-game';
      title.addEventListener('input', () => { config.gallery[index].title = title.value; image.alt = title.value || `Screenshot ${index+1}`; markDirty(); });
      meta.append(label, title);
      const actions = document.createElement('div'); actions.className = 'photo-actions';
      const number = document.createElement('small'); number.textContent = `PHOTO / ${(index+1).toString().padStart(2,'0')}`;
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'delete-photo'; remove.textContent = 'Remove'; remove.setAttribute('aria-label', `Remove photo ${photo.title || index+1}`);
      remove.addEventListener('click', () => {
        config.gallery.splice(index, 1); renderGallery(); markDirty('Photo removed from the draft. Click Save to keep the change.');
      });
      actions.append(number, remove); card.append(image, meta, actions); galleryEditor.append(card);
    });
  }
  function renderFAQEditor() {
    const editor = document.getElementById('faq-editor-list');
    const count = document.getElementById('faq-item-count');
    if (!editor) return;
    editor.replaceChildren();
    const items = Array.isArray(config.faqItems) ? config.faqItems : [];
    if (count) count.textContent = `${items.length} FAQ item${items.length === 1 ? '' : 's'}`;
    if (!items.length) {
      const empty = document.createElement('div'); empty.className = 'admin-gallery-empty';
      empty.textContent = 'No FAQs added yet. Use the form above to create your first question and answer.'; editor.append(empty); return;
    }
    items.forEach((item, index) => {
      const card = document.createElement('article'); card.className = 'faq-editor-item';
      const header = document.createElement('div'); header.className = 'faq-editor-item-head';
      const heading = document.createElement('strong'); heading.textContent = `FAQ / ${String(index + 1).padStart(2, '0')}`;
      const actions = document.createElement('div'); actions.className = 'faq-editor-actions';
      if (index > 0) {
        const up = document.createElement('button'); up.type = 'button'; up.className = 'button button-small button-outline'; up.textContent = 'Move up';
        up.addEventListener('click', () => { [config.faqItems[index - 1], config.faqItems[index]] = [config.faqItems[index], config.faqItems[index - 1]]; renderFAQEditor(); markDirty('FAQ order updated. Click Save and export the config to publish it.'); });
        actions.append(up);
      }
      if (index < items.length - 1) {
        const down = document.createElement('button'); down.type = 'button'; down.className = 'button button-small button-outline'; down.textContent = 'Move down';
        down.addEventListener('click', () => { [config.faqItems[index + 1], config.faqItems[index]] = [config.faqItems[index], config.faqItems[index + 1]]; renderFAQEditor(); markDirty('FAQ order updated. Click Save and export the config to publish it.'); });
        actions.append(down);
      }
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'button button-small button-outline faq-remove'; remove.textContent = 'Remove';
      remove.addEventListener('click', () => { config.faqItems.splice(index, 1); renderFAQEditor(); markDirty('FAQ item removed from the draft. Click Save to keep the change.'); });
      actions.append(remove); header.append(heading, actions);

      const questionLabel = document.createElement('label'); questionLabel.textContent = 'Question';
      const questionInput = document.createElement('input'); questionInput.type = 'text'; questionInput.maxLength = 180; questionInput.value = item.question; questionInput.required = true; questionInput.placeholder = 'What is MaskSMP?';
      questionInput.addEventListener('input', () => { config.faqItems[index].question = questionInput.value; markDirty(); }); questionLabel.append(questionInput);
      const answerLabel = document.createElement('label'); answerLabel.textContent = 'Answer';
      const answerInput = document.createElement('textarea'); answerInput.rows = 4; answerInput.maxLength = 3000; answerInput.value = item.answer; answerInput.required = true; answerInput.placeholder = 'Write the answer here…';
      answerInput.addEventListener('input', () => { config.faqItems[index].answer = answerInput.value; markDirty(); }); answerLabel.append(answerInput);
      const linkLabel = document.createElement('label'); linkLabel.textContent = 'Link URL (optional)';
      const linkInput = document.createElement('input'); linkInput.type = 'url'; linkInput.maxLength = 500; linkInput.value = item.linkUrl || ''; linkInput.placeholder = 'https://example.com/guide';
      const linkHelp = document.createElement('small'); linkHelp.textContent = 'A related page, guide, or resource.';
      linkInput.addEventListener('input', () => { config.faqItems[index].linkUrl = linkInput.value.trim(); markDirty(); }); linkLabel.append(linkInput, linkHelp);
      const linkTextLabel = document.createElement('label'); linkTextLabel.textContent = 'Link label (optional)';
      const linkTextInput = document.createElement('input'); linkTextInput.type = 'text'; linkTextInput.maxLength = 100; linkTextInput.value = item.linkText || ''; linkTextInput.placeholder = 'Read the installation guide';
      linkTextInput.addEventListener('input', () => { config.faqItems[index].linkText = linkTextInput.value; markDirty(); }); linkTextLabel.append(linkTextInput);
      const videoLabel = document.createElement('label'); videoLabel.textContent = 'Video URL (optional)';
      const videoInput = document.createElement('input'); videoInput.type = 'url'; videoInput.maxLength = 500; videoInput.value = item.videoUrl || ''; videoInput.placeholder = 'https://youtu.be/your-video-id';
      const videoHelp = document.createElement('small'); videoHelp.textContent = 'YouTube, Vimeo, or a direct HTTPS .mp4, .webm, or .ogg link.';
      videoInput.addEventListener('input', () => { config.faqItems[index].videoUrl = videoInput.value.trim(); markDirty(); }); videoLabel.append(videoInput, videoHelp);
      const fields = document.createElement('div'); fields.className = 'faq-editor-fields'; fields.append(questionLabel, answerLabel, linkLabel, linkTextLabel, videoLabel);
      card.append(header, fields); editor.append(card);
    });
  }

  function renderStaticTextEditor() {
    const host = document.getElementById('site-text-fields');
    const search = document.getElementById('site-text-search');
    const pageSelect = document.getElementById('site-text-page');
    const count = document.getElementById('site-text-count');
    if (!host || !search || !pageSelect) return;
    const query = search.value.trim().toLowerCase();
    const selectedPage = pageSelect.value;
    const matches = STATIC_TEXT_FIELDS.filter(item => (selectedPage === 'all' || item.page === selectedPage) && (!query || item.label.toLowerCase().includes(query) || item.defaultValue.toLowerCase().includes(query) || item.key.toLowerCase().includes(query)));
    host.replaceChildren();
    const displayLimit = 220;
    matches.slice(0, displayLimit).forEach(item => {
      const label = document.createElement('label'); label.className = 'site-text-field';
      const heading = document.createElement('span'); heading.className = 'site-text-label'; heading.textContent = item.label;
      const current = Object.prototype.hasOwnProperty.call(config.textOverrides || {}, item.key) ? String(config.textOverrides[item.key]) : item.defaultValue;
      let input;
      if (item.defaultValue.length > 105 || item.defaultValue.includes('\n')) { input = document.createElement('textarea'); input.rows = 2; }
      else { input = document.createElement('input'); input.type = 'text'; }
      input.value = current; input.maxLength = 600;
      input.addEventListener('input', () => { config.textOverrides = config.textOverrides || {}; config.textOverrides[item.key] = input.value; markDirty('Website text changed. Click Save and export the config to publish the changes.'); });
      label.append(heading, input); host.append(label);
    });
    if (!matches.length) {
      const empty = document.createElement('div'); empty.className = 'admin-gallery-empty'; empty.textContent = 'No text matches this search. Try another word or select a different page.'; host.append(empty);
    }
    if (count) count.textContent = matches.length > displayLimit ? `Showing ${displayLimit} of ${matches.length} matches` : `${matches.length} editable text fragments`;
    if (matches.length > displayLimit) {
      const hint = document.createElement('p'); hint.className = 'field-help'; hint.textContent = 'Refine the search or select a specific page to show fewer fields.'; host.append(hint);
    }
  }

  async function imageToDataUrl(file) {
    if (!/^image\/(png|jpeg|webp)$/.test(file.type)) throw new Error(`${file.name}: choose a PNG, JPG, or WebP image.`);
    if (file.size > 12 * 1024 * 1024) throw new Error(`${file.name}: the file is larger than 12 MB.`);
    if (!('createImageBitmap' in window)) throw new Error('This browser cannot resize images. Use an up-to-date browser.');
    const bitmap = await createImageBitmap(file);
    let width = bitmap.width, height = bitmap.height;
    const maxSide = 1400;
    const scale = Math.min(1, maxSide / Math.max(width, height));
    width = Math.max(1, Math.round(width * scale)); height = Math.max(1, Math.round(height * scale));
    const canvas = document.createElement('canvas'); canvas.width = width; canvas.height = height;
    const context = canvas.getContext('2d', { alpha:true });
    if (!context) { bitmap.close(); throw new Error('This browser cannot process the image.'); }
    context.drawImage(bitmap, 0, 0, width, height); bitmap.close();
    let quality = 0.82; let dataUrl = canvas.toDataURL('image/webp', quality);
    while (dataUrl.length > MAX_IMAGE_DATA_LENGTH && quality > 0.48) { quality -= 0.08; dataUrl = canvas.toDataURL('image/webp', quality); }
    if (dataUrl.length > MAX_IMAGE_DATA_LENGTH) {
      const smaller = document.createElement('canvas'); smaller.width = Math.round(width * .72); smaller.height = Math.round(height * .72);
      const smallCtx = smaller.getContext('2d'); smallCtx.drawImage(canvas, 0, 0, smaller.width, smaller.height);
      dataUrl = smaller.toDataURL('image/webp', .58);
    }
    if (dataUrl.length > MAX_IMAGE_DATA_LENGTH) throw new Error(`${file.name}: this image is still too large after resizing. Use a smaller image.`);
    return dataUrl;
  }
  async function handlePhotos(files) {
    const list = Array.from(files || []); if (!list.length) return;
    if (config.gallery.length + list.length > MAX_PHOTOS) {
      announce(`You can add up to ${MAX_PHOTOS} photos. Remove a photo first.`, 'is-error'); photoInput.value = ''; return;
    }
    photoInput.disabled = true;
    const initialPhotoCount = config.gallery.length;
    try {
      for (const file of list) {
        const src = await imageToDataUrl(file);
        const currentImageSize = config.gallery.reduce((sum, item) => sum + (item.src?.startsWith('data:image/') ? item.src.length : 0), 0);
        if (currentImageSize + src.length > MAX_TOTAL_IMAGE_DATA_LENGTH) throw new Error('The total image size is too large to save safely. Remove a photo or use smaller screenshots.');
        config.gallery.push({ id: (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`), title: file.name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' '), src });
      }
      renderGallery(); markDirty(`${list.length} image(s) added to your draft. Click Save.`);
    } catch (error) { if (config.gallery.length !== initialPhotoCount) renderGallery(); announce(error.message || 'Adding the image failed.', 'is-error'); }
    finally { photoInput.disabled = false; photoInput.value = ''; }
  }
  function dataUrlBytes(value) {
    if (typeof value !== 'string' || !value.startsWith('data:')) return 0;
    const comma = value.indexOf(',');
    return comma < 0 ? 0 : Math.floor((value.length - comma - 1) * 0.75);
  }
  function totalAssetBytes() {
    return [...config.pluginVersions, ...config.resourcePacks].reduce((sum, item) => sum + (Number(item.fileSize) || dataUrlBytes(item.fileData)), 0);
  }
  function renderAssetList(kind) {
    const plugin = kind === 'plugin';
    const list = document.getElementById(plugin ? 'plugin-versions-list' : 'resource-packs-list');
    const assets = plugin ? config.pluginVersions : config.resourcePacks;
    const emptyText = plugin ? 'No plugin versions added yet.' : 'No resource packs added yet.';
    list.replaceChildren();
    if (!assets.length) {
      const empty = document.createElement('div'); empty.className = 'asset-list-empty'; empty.textContent = emptyText; list.append(empty); return;
    }
    assets.forEach((asset, index) => {
      const card = document.createElement('article'); card.className = 'asset-item';
      const head = document.createElement('div'); head.className = 'asset-item-head';
      const titleWrap = document.createElement('div');
      const title = document.createElement('div'); title.className = 'asset-item-title'; title.textContent = plugin ? `MaskSMP ${asset.version || `release ${index + 1}`}` : (asset.name || `Resource pack ${index + 1}`);
      const subtitle = document.createElement('div'); subtitle.className = 'asset-item-subtitle';
      const parts = [];
      if (asset.minecraftVersion) parts.push(`Minecraft ${asset.minecraftVersion}`);
      if (asset.fileName) parts.push(asset.fileName);
      else if (asset.downloadUrl) parts.push('External HTTPS link');
      if (asset.notes) parts.push(asset.notes);
      subtitle.textContent = parts.join(' · ') || 'No additional details';
      titleWrap.append(title, subtitle);
      const badge = document.createElement('span'); badge.className = 'asset-item-badge'; badge.textContent = asset.fileData ? 'UPLOAD' : 'LINK';
      head.append(titleWrap, badge);
      const actions = document.createElement('div'); actions.className = 'asset-item-actions';
      const size = document.createElement('small');
      const bytes = Number(asset.fileSize) || dataUrlBytes(asset.fileData);
      size.textContent = asset.fileData ? `${(bytes / (1024 * 1024)).toFixed(2)} MB · will be exported` : 'Will be downloaded from link';
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'asset-remove'; remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        assets.splice(index, 1); renderAssetList(kind); markDirty(`${plugin ? 'Plugin version' : 'Resource pack'} removed. Click Save to keep the change.`);
      });
      actions.append(size, remove); card.append(head, actions); list.append(card);
    });
  }
  function readDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader(); reader.onload = () => resolve(String(reader.result || ''));
      reader.onerror = () => reject(new Error(`Could not read ${file.name}.`)); reader.readAsDataURL(file);
    });
  }
  function forceFileMime(dataUrl, mime) {
    return dataUrl.replace(/^data:[^;,]+;base64,/i, `data:${mime};base64,`);
  }
  function setAssetStatus(kind, message, isError=false) {
    const node = document.getElementById(kind === 'plugin' ? 'plugin-version-status' : 'resource-pack-status');
    node.textContent = message; node.classList.toggle('is-error', isError);
  }
  async function addAsset(kind) {
    const plugin = kind === 'plugin';
    config = getFormConfig();
    const name = document.getElementById(plugin ? 'plugin-version-name' : 'pack-name');
    const version = document.getElementById(plugin ? 'plugin-version-name' : 'pack-version');
    const minecraft = document.getElementById(plugin ? 'plugin-minecraft-version' : 'pack-minecraft-version');
    const fileInput = document.getElementById(plugin ? 'plugin-version-file' : 'pack-file');
    const urlInput = document.getElementById(plugin ? 'plugin-version-url' : 'pack-url');
    const notes = document.getElementById(plugin ? 'plugin-version-notes' : 'pack-notes');
    const label = name.value.trim();
    const file = fileInput.files && fileInput.files[0];
    const url = urlInput.value.trim();
    if (!label) { setAssetStatus(kind, plugin ? 'Enter a version number first.' : 'Enter a name for the resource pack first.', true); name.focus(); return; }
    if (!file && !url) { setAssetStatus(kind, 'Choose a file from your device or enter a direct download link.', true); return; }
    if (url && !/^https:\/\//i.test(url) && !/^(?:\.\/)?assets\/[A-Za-z0-9_./-]+$/i.test(url)) { setAssetStatus(kind, 'Use an HTTPS download link or a site-relative assets/... path.', true); urlInput.focus(); return; }
    if (file && file.size > MAX_ASSET_FILE_BYTES) { setAssetStatus(kind, 'This file is larger than 15 MB. Use an HTTPS link to the file.', true); return; }
    if (file) {
      const ext = file.name.split('.').pop().toLowerCase();
      if (plugin && ext !== 'jar') { setAssetStatus(kind, 'Select the actual plugin file with the .jar extension.', true); return; }
      if (!plugin && ext !== 'zip') { setAssetStatus(kind, 'Select a resource pack file with the .zip extension.', true); return; }
      if (totalAssetBytes() + file.size > MAX_TOTAL_ASSET_BYTES) { setAssetStatus(kind, 'The total upload would exceed 15 MB. Use an HTTPS link for larger files.', true); return; }
    }
    const addButton = document.getElementById(plugin ? 'add-plugin-version' : 'add-resource-pack');
    addButton.disabled = true;
    try {
      let fileData = '';
      if (file) {
        fileData = await readDataUrl(file);
        fileData = forceFileMime(fileData, plugin ? 'application/java-archive' : 'application/zip');
      }
      const entry = {
        id: (crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`),
        version: plugin ? label : (version.value.trim() || '1.0'),
        name: plugin ? `MaskSMP ${label}` : label,
        minecraftVersion: minecraft.value.trim(), notes: notes.value.trim(),
        fileName: file ? file.name : '', fileSize: file ? file.size : 0,
        fileData, downloadUrl: file ? '' : url
      };
      if (plugin) config.pluginVersions.unshift(entry); else config.resourcePacks.unshift(entry);
      renderAssetList(kind);
      name.value = ''; if (!plugin) version.value = ''; minecraft.value = ''; notes.value = ''; fileInput.value = ''; urlInput.value = '';
      markDirty(`${plugin ? 'Plugin version' : 'Resource pack'} added. Click Save, then export site-config.json for GitHub.`);
      setAssetStatus(kind, file ? `${file.name} added.` : 'Download link added.');
    } catch (error) {
      setAssetStatus(kind, error.message || 'Adding the file failed.', true);
    } finally { addButton.disabled = false; }
  }
  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  }
  function customMaskDataBytes(mask) {
    const asBytes = value => Math.max(0, Math.floor((String(value || '').length * 3) / 4));
    return asBytes(mask.textureData) + (mask.tierTextures || []).reduce((sum, value) => sum + asBytes(value), 0) + JSON.stringify(mask.geometry || []).length;
  }
  function totalCustomMaskBytes() {
    return (config.customMasks || []).reduce((sum, mask) => sum + (Number(mask.fileBytes) || customMaskDataBytes(mask)), 0);
  }
  function renderCustomMaskList() {
    const list = document.getElementById('custom-mask-list');
    const count = document.getElementById('custom-mask-count');
    if (!list || !count) return;
    const items = config.customMasks || [];
    count.textContent = `${items.length} custom mask${items.length === 1 ? '' : 's'}`;
    list.replaceChildren();
    if (!items.length) {
      const empty = document.createElement('div'); empty.className = 'admin-gallery-empty'; empty.textContent = 'Upload a Blockbench model and texture to add your first custom mask.'; list.append(empty); return;
    }
    items.forEach((mask, index) => {
      const card = document.createElement('article'); card.className = 'custom-mask-item';
      const image = document.createElement('img'); image.className = 'custom-mask-item-thumb'; image.src = mask.textureData || ''; image.alt = ''; image.style.setProperty('--mask-accent', mask.color || '#b45cff');
      const details = document.createElement('div'); details.className = 'custom-mask-item-details';
      const title = document.createElement('strong'); title.textContent = mask.name || 'Custom mask';
      const info = document.createElement('span'); info.textContent = `${(mask.geometry || []).length} model cubes · ${mask.tierTextures.filter(Boolean).length} tier texture overrides`;
      const files = document.createElement('small'); files.textContent = `${mask.modelFileName || 'Blockbench model'} · ${mask.textureFileName || 'PNG texture'}`;
      details.append(title, info, files);
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'button button-small button-outline'; remove.textContent = 'Remove';
      remove.addEventListener('click', () => {
        if (!window.confirm(`Remove “${mask.name}” from the custom mask draft?`)) return;
        config.customMasks.splice(index, 1); renderCustomMaskList(); markDirty('Custom mask removed from the draft. Export site-config.json to publish the removal.');
      });
      card.append(image, details, remove); list.append(card);
    });
  }
  function blockbenchGeometry(model, widthFallback, heightFallback) {
    const resolution = model.resolution || {};
    const uvWidth = Math.max(1, Number(resolution.width) || widthFallback || 64);
    const uvHeight = Math.max(1, Number(resolution.height) || heightFallback || 64);
    const faceOrder = ['north', 'east', 'south', 'west', 'up', 'down'];
    const axis = { x:0, y:1, z:2 };
    const geometry = [];
    for (const cube of (Array.isArray(model.elements) ? model.elements : [])) {
      if (!cube || !Array.isArray(cube.from) || !Array.isArray(cube.to) || !cube.faces) continue;
      const from = cube.from.map(Number), to = cube.to.map(Number);
      if (from.length !== 3 || to.length !== 3 || [...from, ...to].some(value => !Number.isFinite(value))) continue;
      const rotation = cube.rotation || {};
      const angle = Number(rotation.angle) || 0;
      const rotationAxis = axis[String(rotation.axis || 'y').toLowerCase()] ?? 1;
      const origin = Array.isArray(rotation.origin) && rotation.origin.length === 3 ? rotation.origin.map(Number) : [8, 8, 8];
      const faces = faceOrder.map(faceName => {
        const face = cube.faces[faceName];
        if (!face || !Array.isArray(face.uv) || face.uv.length < 4 || face.texture === null) return null;
        const [u1, v1, u2, v2] = face.uv.map(Number);
        if (![u1, v1, u2, v2].every(Number.isFinite)) return null;
        // Eight UV values preserve Blockbench face rotation instead of assuming every face has the same orientation.
        let corners = [[u1,v1],[u2,v1],[u2,v2],[u1,v2]];
        const turn = ((((Number(face.rotation) || 0) / 90) % 4) + 4) % 4;
        for (let i = 0; i < turn; i++) corners = [corners[3], corners[0], corners[1], corners[2]];
        return corners.flatMap(([u,v]) => [u * 16 / uvWidth, v * 16 / uvHeight]);
      });
      if (!faces.some(Boolean)) continue;
      geometry.push([...from, ...to, angle, rotationAxis, ...origin, faces]);
    }
    if (!geometry.length) throw new Error('No textured cube elements were found. Open the Blockbench model and make sure its cubes have PNG texture faces with UVs assigned.');
    return geometry;
  }
  async function addCustomMask() {
    config = getFormConfig();
    const nameField = document.getElementById('custom-mask-name');
    const modelInput = document.getElementById('custom-mask-model');
    const textureInput = document.getElementById('custom-mask-texture');
    const status = document.getElementById('custom-mask-status');
    const button = document.getElementById('add-custom-mask');
    const name = nameField.value.trim();
    const modelFile = modelInput.files && modelInput.files[0];
    const textureFile = textureInput.files && textureInput.files[0];
    const say = (message, error=false) => { status.textContent = message; status.classList.toggle('is-error', error); };
    if (!name) { say('Enter a mask name first.', true); nameField.focus(); return; }
    if (!modelFile || !textureFile) { say('Choose both a Blockbench .bbmodel and a base PNG texture.', true); (!modelFile ? modelInput : textureInput).focus(); return; }
    if (!/\.(bbmodel|json)$/i.test(modelFile.name)) { say('Choose a Blockbench .bbmodel file (JSON format).', true); return; }
    if (!/\.png$/i.test(textureFile.name) || (textureFile.type && textureFile.type !== 'image/png')) { say('The base texture must be a PNG file.', true); return; }
    const tierInputs = [1,2,3,4,5,6].map(level => document.getElementById(`custom-mask-tier-${level}`));
    const tierFiles = tierInputs.map(input => input.files && input.files[0] || null);
    if (modelFile.size > MAX_CUSTOM_MASK_MODEL_BYTES) { say('The Blockbench model is larger than 2 MB. Remove unused project data and try again.', true); return; }
    const allTextures = [textureFile, ...tierFiles.filter(Boolean)];
    const oversized = allTextures.find(file => file.size > MAX_CUSTOM_MASK_TEXTURE_BYTES || !/\.png$/i.test(file.name) || (file.type && file.type !== 'image/png'));
    if (oversized) { say(`${oversized.name} must be a PNG no larger than 1 MB.`, true); return; }
    const newBytes = modelFile.size + allTextures.reduce((sum, file) => sum + file.size, 0);
    const knownBytes = (config.customMasks || []).reduce((sum, mask) => sum + (Number(mask.fileBytes) || customMaskDataBytes(mask)), 0);
    if (knownBytes + newBytes > MAX_TOTAL_CUSTOM_MASK_BYTES) { say('The custom-mask uploads would exceed the 10 MB total limit. Compress your PNGs or remove unused custom masks first.', true); return; }
    button.disabled = true; say('Reading Blockbench model and textures…');
    try {
      const model = JSON.parse(await modelFile.text());
      if (!model || !Array.isArray(model.elements)) throw new Error('This file does not look like a Blockbench project with an elements array.');
      const textureData = await readDataUrl(textureFile);
      const tierTextures = await Promise.all(tierFiles.map(file => file ? readDataUrl(file) : Promise.resolve('')));
      const loadTextureImage = (dataUrl, description) => new Promise((resolve, reject) => {
        const image = new Image(); image.decoding = 'async'; image.onload = () => resolve(image); image.onerror = () => reject(new Error(`${description} could not be decoded as a PNG.`)); image.src = dataUrl;
      });
      const textureImage = await loadTextureImage(textureData, 'The uploaded base texture');
      const modelUvWidth = Number(model.resolution && model.resolution.width) || textureImage.naturalWidth;
      const modelUvHeight = Number(model.resolution && model.resolution.height) || textureImage.naturalHeight;
      if (modelUvWidth !== textureImage.naturalWidth || modelUvHeight !== textureImage.naturalHeight) throw new Error(`Texture size mismatch: Blockbench expects ${modelUvWidth}×${modelUvHeight}, but the uploaded PNG is ${textureImage.naturalWidth}×${textureImage.naturalHeight}. Upload a PNG with matching dimensions.`);
      for (let level = 0; level < tierTextures.length; level++) if (tierTextures[level]) {
        const tierImage = await loadTextureImage(tierTextures[level], `Mask Level ${level + 1} texture`);
        if (tierImage.naturalWidth !== textureImage.naturalWidth || tierImage.naturalHeight !== textureImage.naturalHeight) throw new Error(`Mask Level ${level + 1} must be ${textureImage.naturalWidth}×${textureImage.naturalHeight} pixels to match the Blockbench UVs.`);
      }
      const geometry = blockbenchGeometry(model, textureImage.naturalWidth, textureImage.naturalHeight);
      const baseSlug = name.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 36) || 'custom-mask';
      const id = `custom-${baseSlug}-${Date.now().toString(36)}`;
      const powers = [1,2,3].map(level => [
        document.getElementById(`custom-mask-power-${level}-name`).value.trim() || `Power ${level}`,
        document.getElementById(`custom-mask-power-${level}-description`).value.trim() || 'Custom mask ability.'
      ]);
      config.customMasks.unshift({ id, name, description: document.getElementById('custom-mask-description').value.trim(), color: document.getElementById('custom-mask-color').value || '#b45cff', geometry, textureData, tierTextures, powers, modelFileName: modelFile.name, textureFileName: textureFile.name, fileBytes: newBytes, textureWidth: textureImage.naturalWidth, textureHeight: textureImage.naturalHeight });
      renderCustomMaskList();
      nameField.value = ''; document.getElementById('custom-mask-description').value = ''; modelInput.value = ''; textureInput.value = ''; tierInputs.forEach(input => { input.value = ''; });
      [1,2,3].forEach(level => { document.getElementById(`custom-mask-power-${level}-name`).value = ''; document.getElementById(`custom-mask-power-${level}-description`).value = ''; });
      say(`${name} added (${geometry.length} cube elements). Click Save, then download the config and publish it to GitHub.`);
      markDirty('Custom mask added to the draft. Save and export site-config.json to publish it.');
    } catch (error) {
      say(error.message || 'Could not read that Blockbench model.', true);
    } finally { button.disabled = false; }
  }

  function compactConfig(value) {
    // Store descriptions and metadata in localStorage; larger uploaded binaries live in IndexedDB.
    return {
      ...value,
      pluginVersions: value.pluginVersions.map(({ fileData, ...item }) => item),
      resourcePacks: value.resourcePacks.map(({ fileData, ...item }) => item),
      customMasks: value.customMasks && value.customMasks.length ? value.customMasks.map(({ geometry, textureData, tierTextures, ...item }) => item) : undefined
    };
  }
  async function saveLocal(showMessage=true) {
    config = getFormConfig();
    let dbSaved = false;
    try { await dbSet('siteConfig', config); dbSaved = true; }
    catch (error) { /* try compact metadata in localStorage below */ }
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(compactConfig(config))); }
    catch (error) { if (!dbSaved) { announce('Save failed. Browser storage is full or unavailable.', 'is-error'); return false; } }
    if (!dbSaved && (config.pluginVersions.some(item => item.fileData) || config.resourcePacks.some(item => item.fileData) || (config.customMasks || []).some(item => !Array.isArray(item.geometry) || !item.geometry.length || !item.textureData || (item.tierTextures || []).some(Boolean)))) {
      announce('The browser could not store files locally. Download the GitHub config so you do not lose these uploads.', 'is-error');
      dirty = false; return false;
    }
    dirty = false;
    if (showMessage) announce('Saved in this browser. Also download the config for your live website.', 'is-saved');
    return true;
  }
  async function downloadConfig() {
    config = getFormConfig();
    const blob = new Blob([JSON.stringify(config, null, 2)], { type:'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = 'site-config.json'; document.body.append(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    await saveLocal(false);
    announce('site-config.json downloaded. Upload this file to the root of your GitHub repository and commit the change.', 'is-saved');
  }
  async function resetPublished() {
    if (!window.confirm('Discard all local draft changes and reload the contents of site-config.json?')) return;
    localStorage.removeItem(STORAGE_KEY);
    try { await dbDelete('siteConfig'); } catch (error) { /* database may not exist yet */ }
    canonical = await readCanonical(); config = normalise(canonical); fillForm(config); renderGallery(); renderFAQEditor(); renderCustomMaskList(); renderStaticTextEditor(); renderAssetList('plugin'); renderAssetList('pack');
    dirty = false; announce('Local changes cleared. This is the published configuration.', 'is-saved'); updateCounterManagementState(); void refreshAdminDownloadCounters();
  }
  async function importConfig(file) {
    if (!file) return;
    try {
      const imported = normalise(JSON.parse(await file.text()));
      config = imported; fillForm(config); renderGallery(); renderFAQEditor(); renderCustomMaskList(); renderStaticTextEditor(); renderAssetList('plugin'); renderAssetList('pack'); dirty = true;
      document.getElementById('import-status').textContent = `Imported: ${file.name}. Click Save or download the config for GitHub.`;
      announce('Configuration loaded as a draft. Remember to click Save.'); updateCounterManagementState(); void refreshAdminDownloadCounters();
    } catch (error) { document.getElementById('import-status').textContent = 'Import failed. Make sure you selected a valid site-config.json file.'; announce('The JSON file could not be read.', 'is-error'); }
  }
  const COUNTER_API_BASE = 'https://abacus.jasoncameron.dev';
  const LEGACY_COUNTER_NAMESPACE = 'masksmp-official-site-2026';
  const COUNTER_KEYS = { plugin: 'plugin-downloads', pack: 'resource-pack-downloads' };
  const COUNTER_ADMIN_STORAGE = 'masksmp-download-counter-admin-keys-v1';
  function activeCounterNamespace() {
    const candidate = String(config.downloadCounterNamespace || LEGACY_COUNTER_NAMESPACE).trim();
    return /^[A-Za-z0-9_.-]{3,64}$/.test(candidate) ? candidate : LEGACY_COUNTER_NAMESPACE;
  }
  function readPrivateCounterKeys() {
    try { const value = JSON.parse(localStorage.getItem(COUNTER_ADMIN_STORAGE) || 'null'); return value && typeof value === 'object' ? value : null; }
    catch (_) { return null; }
  }
  function writePrivateCounterKeys(value) {
    localStorage.setItem(COUNTER_ADMIN_STORAGE, JSON.stringify(value));
    updateCounterManagementState();
  }
  function hasActiveCounterKeys() {
    const stored = readPrivateCounterKeys();
    return Boolean(stored && stored.namespace === activeCounterNamespace() && stored.keys && stored.keys.plugin && stored.keys.pack);
  }
  function setCounterStatus(message, tone='') {
    const node = document.getElementById('admin-counter-status');
    if (!node) return;
    node.textContent = message;
    node.classList.remove('is-error','is-saved');
    if (tone) node.classList.add(tone);
  }
  function updateCounterManagementState() {
    const managed = hasActiveCounterKeys();
    ['reset-plugin-counter','reset-pack-counter','export-counter-keys'].forEach(id => { const node = document.getElementById(id); if (node) node.disabled = !managed; });
    const setup = document.getElementById('setup-managed-counters');
    if (setup) setup.textContent = managed ? 'Managed counters ready' : 'Set up reset controls';
    return managed;
  }
  async function fetchCounterValue(namespace, key) {
    const response = await fetch(`${COUNTER_API_BASE}/get/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`, { cache:'no-store' });
    if (response.status === 404) return 0;
    const result = await response.json();
    if (!response.ok || !Number.isFinite(Number(result.value))) throw new Error(result.error || `Counter API returned ${response.status}`);
    return Math.max(0, Math.floor(Number(result.value)));
  }
  async function refreshAdminDownloadCounters() {
    const ns = activeCounterNamespace();
    const pluginNode = document.getElementById('admin-plugin-download-count');
    const packNode = document.getElementById('admin-pack-download-count');
    setCounterStatus('Refreshing shared download totals…');
    try {
      const [plugin, pack] = await Promise.all([fetchCounterValue(ns, COUNTER_KEYS.plugin), fetchCounterValue(ns, COUNTER_KEYS.pack)]);
      pluginNode.textContent = plugin.toLocaleString(); packNode.textContent = pack.toLocaleString();
      setCounterStatus(`Connected to shared counters in namespace “${ns}”.`, 'is-saved');
    } catch (error) {
      pluginNode.textContent = 'Unavailable'; packNode.textContent = 'Unavailable';
      setCounterStatus('Could not reach the shared counter service. Your website downloads are not blocked. Check your connection and try Refresh totals again.', 'is-error');
    }
    updateCounterManagementState();
  }
  async function initializeManagedCounters() {
    if (hasActiveCounterKeys()) { setCounterStatus('Managed counters are already set up. Use the reset buttons above whenever you need.', 'is-saved'); return; }
    if (!window.confirm('Set up resettable shared download counters? This starts both totals at zero in a new counter namespace. Existing totals will remain in the old namespace and will not be copied. You must export and publish site-config.json after setup.')) return;
    const button = document.getElementById('setup-managed-counters');
    button.disabled = true; button.textContent = 'Setting up…';
    const suffix = (crypto.randomUUID ? crypto.randomUUID().replace(/-/g,'').slice(0,10) : Math.random().toString(36).slice(2,12));
    const namespace = `masksmp-managed-${Date.now().toString(36)}-${suffix}`;
    const privateKeys = { namespace, keys:{} };
    try {
      for (const kind of ['plugin','pack']) {
        const response = await fetch(`${COUNTER_API_BASE}/create/${encodeURIComponent(namespace)}/${encodeURIComponent(COUNTER_KEYS[kind])}`, { cache:'no-store' });
        const result = await response.json();
        if (!response.ok || !result.admin_key) throw new Error(result.error || `Counter setup failed for ${kind}.`);
        privateKeys.keys[kind] = result.admin_key;
        // Keep the credentials local to this admin browser, never inside site-config.json.
        localStorage.setItem(COUNTER_ADMIN_STORAGE, JSON.stringify(privateKeys));
      }
      config = getFormConfig(); config.downloadCounterNamespace = namespace;
      const saved = await saveLocal(false);
      if (!saved) throw new Error('The counter keys were created, but the site config could not be saved locally. Keep the private key backup and retry Save.');
      await refreshAdminDownloadCounters();
      setCounterStatus('Setup complete. Download a private reset-key backup now, then click “Download config for GitHub” and publish site-config.json. The public download page will use the new zeroed counters after that publish.', 'is-saved');
      const backupButton = document.getElementById('export-counter-keys'); if (backupButton) backupButton.disabled = false;
    } catch (error) {
      setCounterStatus(`Could not finish setup: ${error.message || 'unknown error'}. Check the connection, then retry.`, 'is-error');
    } finally {
      button.disabled = false; button.textContent = hasActiveCounterKeys() ? 'Managed counters ready' : 'Set up reset controls';
      updateCounterManagementState();
    }
  }
  async function resetManagedCounter(kind) {
    const stored = readPrivateCounterKeys(); const namespace = activeCounterNamespace(); const key = COUNTER_KEYS[kind];
    if (!stored || stored.namespace !== namespace || !stored.keys || !stored.keys[kind]) {
      setCounterStatus('Reset controls are not ready in this browser. Set up the managed counters or import your private reset-key backup first.', 'is-error'); return;
    }
    const label = kind === 'plugin' ? 'plugin download count' : 'resource-pack download count';
    if (!window.confirm(`Reset the shared ${label} to zero? This changes the total for everyone visiting the live website.`)) return;
    const button = document.getElementById(kind === 'plugin' ? 'reset-plugin-counter' : 'reset-pack-counter');
    button.disabled = true;
    try {
      const response = await fetch(`${COUNTER_API_BASE}/reset/${encodeURIComponent(namespace)}/${encodeURIComponent(key)}`, { method:'POST', headers:{ Authorization:`Bearer ${stored.keys[kind]}` }, cache:'no-store' });
      const result = await response.json();
      if (!response.ok || Number(result.value) !== 0) throw new Error(result.error || `Reset failed with status ${response.status}`);
      document.getElementById(kind === 'plugin' ? 'admin-plugin-download-count' : 'admin-pack-download-count').textContent = '0';
      setCounterStatus(`The shared ${label} has been reset to zero.`, 'is-saved');
    } catch (error) {
      setCounterStatus(`Reset failed: ${error.message || 'unknown error'}. Make sure you have the correct private reset-key backup and an internet connection.`, 'is-error');
    } finally { button.disabled = false; updateCounterManagementState(); }
  }
  function downloadPrivateCounterKeyBackup() {
    const stored = readPrivateCounterKeys();
    if (!stored || !hasActiveCounterKeys()) { setCounterStatus('Set up the managed counters before creating a key backup.', 'is-error'); return; }
    const blob = new Blob([JSON.stringify({ format:'masksmp-counter-admin-keys-v1', ...stored }, null, 2)], { type:'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob); const link = document.createElement('a');
    link.href = url; link.download = 'masksmp-counter-admin-keys-KEEP-PRIVATE.json'; document.body.append(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    setCounterStatus('Private key backup downloaded. Store it safely and never upload this JSON file to GitHub or your public website.', 'is-saved');
  }
  async function importPrivateCounterKeyBackup(file) {
    if (!file) return;
    try {
      const value = JSON.parse(await file.text());
      if (!value || value.format !== 'masksmp-counter-admin-keys-v1' || !/^[A-Za-z0-9_.-]{3,64}$/.test(String(value.namespace || '')) || !value.keys || !value.keys.plugin || !value.keys.pack) throw new Error('This is not a valid MaskSMP private counter-key backup.');
      localStorage.setItem(COUNTER_ADMIN_STORAGE, JSON.stringify({ namespace:value.namespace, keys:{ plugin:value.keys.plugin, pack:value.keys.pack } }));
      config = getFormConfig(); config.downloadCounterNamespace = value.namespace;
      const saved = await saveLocal(false);
      if (!saved) throw new Error('The key backup loaded, but the config could not be saved locally.');
      await refreshAdminDownloadCounters();
      setCounterStatus('Private reset keys imported. If this uses a different counter namespace, export and publish the updated site-config.json as well.', 'is-saved');
    } catch (error) { setCounterStatus(error.message || 'Could not import that key backup.', 'is-error'); }
    finally { const input=document.getElementById('counter-keys-file'); if(input) input.value=''; updateCounterManagementState(); }
  }

  document.addEventListener('DOMContentLoaded', async () => {
    canonical = await readCanonical(); config = combineSavedWithPublished(await readLocal(), canonical);
    fillForm(config); renderGallery(); renderFAQEditor(); renderCustomMaskList(); renderStaticTextEditor(); renderAssetList('plugin'); renderAssetList('pack');
    form.addEventListener('input', event => { if (event.target.matches('input,textarea,select') && !event.target.closest('.site-text-field')) markDirty(); });
    const logoToggle = document.getElementById('logo-theme-toggle');
    if (logoToggle) logoToggle.addEventListener('click', () => {
      const themeField = form.elements.namedItem('logoTheme');
      themeField.value = themeField.value === 'yellow' ? 'purple' : 'yellow';
      syncLogoThemeControls();
      markDirty('Logo theme changed. Click Save and export the config to publish the change.');
    });
    document.getElementById('site-text-search').addEventListener('input', renderStaticTextEditor);
    document.getElementById('site-text-page').addEventListener('change', renderStaticTextEditor);
    document.getElementById('reset-site-text').addEventListener('click', () => { if (!window.confirm('Reset all custom static text edits to the website defaults?')) return; config.textOverrides = {}; renderStaticTextEditor(); markDirty('Static text overrides cleared. Click Save and export the config to publish the reset.'); });
    photoInput.addEventListener('change', () => handlePhotos(photoInput.files));
    document.getElementById('add-plugin-version').addEventListener('click', () => addAsset('plugin'));
    document.getElementById('add-resource-pack').addEventListener('click', () => addAsset('pack'));
    document.getElementById('add-custom-mask').addEventListener('click', addCustomMask);
    document.getElementById('add-faq-item').addEventListener('click', () => {
      const questionField = document.getElementById('faq-question');
      const answerField = document.getElementById('faq-answer');
      const linkField = document.getElementById('faq-link-url');
      const linkTextField = document.getElementById('faq-link-text');
      const videoField = document.getElementById('faq-video-url');
      const question = questionField.value.trim();
      const answer = answerField.value.trim();
      const linkUrl = linkField.value.trim();
      const linkText = linkTextField.value.trim();
      const videoUrl = videoField.value.trim();
      const feedback = document.getElementById('faq-editor-status');
      if (!question || !answer) { feedback.textContent = 'A question and an answer are required.'; feedback.classList.add('is-error'); (!question ? questionField : answerField).focus(); return; }
      if (linkUrl && !/^https:\/\//i.test(linkUrl)) { feedback.textContent = 'Link URLs must start with https://'; feedback.classList.add('is-error'); linkField.focus(); return; }
      if (videoUrl && !/^https:\/\//i.test(videoUrl)) { feedback.textContent = 'Video links must start with https://'; feedback.classList.add('is-error'); videoField.focus(); return; }
      config.faqItems.push({ id: 'faq-' + Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 7), question, answer, linkUrl, linkText, videoUrl });
      questionField.value = ''; answerField.value = ''; linkField.value = ''; linkTextField.value = ''; videoField.value = '';
      feedback.textContent = 'FAQ added. Click Save, then export site-config.json to publish it.'; feedback.classList.remove('is-error');
      renderFAQEditor(); markDirty('FAQ item added to the draft. Click Save to keep it.');
    });
    document.getElementById('save-button').addEventListener('click', () => saveLocal(true));
    document.getElementById('export-button').addEventListener('click', downloadConfig);
    document.getElementById('reset-button').addEventListener('click', resetPublished);
    document.getElementById('config-file').addEventListener('change', event => importConfig(event.target.files?.[0]));
    document.getElementById('setup-managed-counters').addEventListener('click', initializeManagedCounters);
    document.getElementById('refresh-download-counters').addEventListener('click', refreshAdminDownloadCounters);
    document.getElementById('reset-plugin-counter').addEventListener('click', () => resetManagedCounter('plugin'));
    document.getElementById('reset-pack-counter').addEventListener('click', () => resetManagedCounter('pack'));
    document.getElementById('export-counter-keys').addEventListener('click', downloadPrivateCounterKeyBackup);
    document.getElementById('counter-keys-file').addEventListener('change', event => importPrivateCounterKeyBackup(event.target.files?.[0]));
    updateCounterManagementState();
    void refreshAdminDownloadCounters();
    window.addEventListener('beforeunload', event => { if (dirty) { event.preventDefault(); event.returnValue = ''; } });
  });
})();
