export interface Level {
  id: number;
  disease: {
    zh: string;
    en: string;
  };
  treatmentDays: number;
  category: 'mild' | 'common' | 'serious' | 'critical' | 'fatal';
  question: {
    zh: string;
    en: string;
  };
  options: {
    zh: [string, string, string, string];
    en: [string, string, string, string];
  };
  correctAnswer: 0 | 1 | 2 | 3;
  explanation: {
    zh: string;
    en: string;
  };
}

export const categoryNames = {
  mild: { zh: '轻微', en: 'Mild' },
  common: { zh: '常见', en: 'Common' },
  serious: { zh: '严重', en: 'Serious' },
  critical: { zh: '危重', en: 'Critical' },
  fatal: { zh: '致命', en: 'Fatal' }
};

export const categoryColors = {
  mild: '#4CAF50',
  common: '#2196F3',
  serious: '#FF9800',
  critical: '#F44336',
  fatal: '#9C27B0'
};

export const levels: Level[] = [
  {
    id: 1,
    disease: { zh: '普通感冒', en: 'Common Cold' },
    treatmentDays: 3,
    category: 'mild',
    question: {
      zh: '普通感冒最常见的症状是什么？',
      en: 'What is the most common symptom of a common cold?'
    },
    options: {
      zh: ['流鼻涕', '胸痛', '视力模糊', '关节疼痛'],
      en: ['Runny nose', 'Chest pain', 'Blurred vision', 'Joint pain']
    },
    correctAnswer: 0,
    explanation: {
      zh: '普通感冒主要影响上呼吸道，流鼻涕、鼻塞、打喷嚏是最典型的症状。',
      en: 'The common cold primarily affects the upper respiratory tract. Runny nose, nasal congestion, and sneezing are the most typical symptoms.'
    }
  },
  {
    id: 2,
    disease: { zh: '头痛', en: 'Headache' },
    treatmentDays: 1,
    category: 'mild',
    question: {
      zh: '紧张性头痛最常见的诱因是什么？',
      en: 'What is the most common trigger for tension headaches?'
    },
    options: {
      zh: ['压力和疲劳', '高血压', '糖尿病', '感染'],
      en: ['Stress and fatigue', 'High blood pressure', 'Diabetes', 'Infection']
    },
    correctAnswer: 0,
    explanation: {
      zh: '紧张性头痛通常由压力、疲劳、姿势不良或肌肉紧张引起。',
      en: 'Tension headaches are usually caused by stress, fatigue, poor posture, or muscle tension.'
    }
  },
  {
    id: 3,
    disease: { zh: '咳嗽', en: 'Cough' },
    treatmentDays: 5,
    category: 'mild',
    question: {
      zh: '急性咳嗽通常持续多长时间？',
      en: 'How long does an acute cough typically last?'
    },
    options: {
      zh: ['少于3周', '1-2个月', '3-6个月', '超过6个月'],
      en: ['Less than 3 weeks', '1-2 months', '3-6 months', 'More than 6 months']
    },
    correctAnswer: 0,
    explanation: {
      zh: '急性咳嗽通常持续少于3周，多由感冒或呼吸道感染引起。',
      en: 'Acute cough typically lasts less than 3 weeks and is often caused by colds or respiratory infections.'
    }
  },
  {
    id: 4,
    disease: { zh: '喉咙痛', en: 'Sore Throat' },
    treatmentDays: 4,
    category: 'mild',
    question: {
      zh: '病毒性喉咙痛和细菌性喉咙痛的主要区别是什么？',
      en: 'What is the main difference between viral and bacterial sore throat?'
    },
    options: {
      zh: ['细菌性通常需要抗生素', '病毒性更严重', '两者没有区别', '病毒性需要手术'],
      en: ['Bacterial usually requires antibiotics', 'Viral is more severe', 'There is no difference', 'Viral requires surgery']
    },
    correctAnswer: 0,
    explanation: {
      zh: '细菌性喉咙痛（如链球菌性咽炎）通常需要抗生素治疗，而病毒性喉咙痛通常自行缓解。',
      en: 'Bacterial sore throat (like strep throat) usually requires antibiotics, while viral sore throat typically resolves on its own.'
    }
  },
  {
    id: 5,
    disease: { zh: '轻度发烧', en: 'Mild Fever' },
    treatmentDays: 2,
    category: 'mild',
    question: {
      zh: '成人体温超过多少度被认为是发烧？',
      en: 'At what temperature is an adult considered to have a fever?'
    },
    options: {
      zh: ['37.5°C', '36.5°C', '38.5°C', '39.5°C'],
      en: ['37.5°C', '36.5°C', '38.5°C', '39.5°C']
    },
    correctAnswer: 0,
    explanation: {
      zh: '成人体温超过37.5°C（99.5°F）通常被认为是发烧。',
      en: 'An adult body temperature above 37.5°C (99.5°F) is generally considered a fever.'
    }
  },
  {
    id: 6,
    disease: { zh: '鼻塞', en: 'Nasal Congestion' },
    treatmentDays: 5,
    category: 'mild',
    question: {
      zh: '缓解鼻塞最有效的方法是什么？',
      en: 'What is the most effective way to relieve nasal congestion?'
    },
    options: {
      zh: ['使用生理盐水喷雾', '用力擤鼻涕', '服用抗生素', '完全避免喝水'],
      en: ['Use saline nasal spray', 'Blow nose forcefully', 'Take antibiotics', 'Avoid drinking water completely']
    },
    correctAnswer: 0,
    explanation: {
      zh: '生理盐水喷雾可以帮助清洁鼻腔、减轻肿胀，是安全有效的缓解方法。',
      en: 'Saline nasal spray can help clean the nasal passages and reduce swelling, providing safe and effective relief.'
    }
  },
  {
    id: 7,
    disease: { zh: '打喷嚏', en: 'Sneezing' },
    treatmentDays: 1,
    category: 'mild',
    question: {
      zh: '打喷嚏的主要生理功能是什么？',
      en: 'What is the main physiological function of sneezing?'
    },
    options: {
      zh: ['清除鼻腔刺激物', '降低血压', '帮助消化', '调节体温'],
      en: ['Clear nasal irritants', 'Lower blood pressure', 'Aid digestion', 'Regulate body temperature']
    },
    correctAnswer: 0,
    explanation: {
      zh: '打喷嚏是身体的保护性反射，用于清除鼻腔中的刺激物、灰尘或病原体。',
      en: 'Sneezing is a protective reflex that clears irritants, dust, or pathogens from the nasal passages.'
    }
  },
  {
    id: 8,
    disease: { zh: '轻微割伤', en: 'Minor Cut' },
    treatmentDays: 7,
    category: 'mild',
    question: {
      zh: '处理轻微割伤的第一步是什么？',
      en: 'What is the first step in treating a minor cut?'
    },
    options: {
      zh: ['清洁伤口', '立即包扎', '涂抹抗生素', '忽略它'],
      en: ['Clean the wound', 'Bandage immediately', 'Apply antibiotics', 'Ignore it']
    },
    correctAnswer: 0,
    explanation: {
      zh: '处理割伤的第一步是用清水和肥皂清洁伤口，防止感染。',
      en: 'The first step in treating a cut is to clean it with water and soap to prevent infection.'
    }
  },
  {
    id: 9,
    disease: { zh: '轻度烧伤', en: 'Minor Burn' },
    treatmentDays: 5,
    category: 'mild',
    question: {
      zh: '一度烧伤的主要特征是什么？',
      en: 'What is the main characteristic of a first-degree burn?'
    },
    options: {
      zh: ['皮肤发红和疼痛', '起水泡', '皮肤变白', '伤口很深'],
      en: ['Redness and pain', 'Blisters', 'White skin', 'Deep wound']
    },
    correctAnswer: 0,
    explanation: {
      zh: '一度烧伤只影响表皮，表现为皮肤发红、疼痛，通常3-5天愈合。',
      en: 'First-degree burns only affect the epidermis, causing redness and pain, and usually heal in 3-5 days.'
    }
  },
  {
    id: 10,
    disease: { zh: '蚊虫叮咬', en: 'Insect Bite' },
    treatmentDays: 2,
    category: 'mild',
    question: {
      zh: '蚊虫叮咬后红肿的原因是什么？',
      en: 'What causes redness and swelling after an insect bite?'
    },
    options: {
      zh: ['身体对昆虫唾液的过敏反应', '感染', '毒素积累', '血液循环问题'],
      en: ['Allergic reaction to insect saliva', 'Infection', 'Toxin accumulation', 'Blood circulation problems']
    },
    correctAnswer: 0,
    explanation: {
      zh: '蚊虫叮咬后的反应是身体对昆虫唾液中的蛋白质产生的免疫反应。',
      en: 'The reaction after an insect bite is an immune response to proteins in the insect\'s saliva.'
    }
  },
  {
    id: 11,
    disease: { zh: '轻微腹泻', en: 'Mild Diarrhea' },
    treatmentDays: 3,
    category: 'mild',
    question: {
      zh: '急性腹泻时最重要的治疗是什么？',
      en: 'What is the most important treatment for acute diarrhea?'
    },
    options: {
      zh: ['补充水分和电解质', '立即服用止泻药', '禁食', '服用抗生素'],
      en: ['Replenish fluids and electrolytes', 'Take anti-diarrheal medication immediately', 'Fast completely', 'Take antibiotics']
    },
    correctAnswer: 0,
    explanation: {
      zh: '腹泻时最重要的是防止脱水，补充水分和电解质比止泻更重要。',
      en: 'The most important thing during diarrhea is preventing dehydration. Replenishing fluids and electrolytes is more important than stopping the diarrhea.'
    }
  },
  {
    id: 12,
    disease: { zh: '消化不良', en: 'Indigestion' },
    treatmentDays: 2,
    category: 'mild',
    question: {
      zh: '功能性消化不良最常见的原因是什么？',
      en: 'What is the most common cause of functional dyspepsia?'
    },
    options: {
      zh: ['饮食习惯和压力', '胃溃疡', '胃癌', '细菌感染'],
      en: ['Eating habits and stress', 'Stomach ulcer', 'Stomach cancer', 'Bacterial infection']
    },
    correctAnswer: 0,
    explanation: {
      zh: '功能性消化不良通常与饮食习惯、压力、焦虑有关，而非器质性疾病。',
      en: 'Functional dyspepsia is usually related to eating habits, stress, and anxiety, rather than organic disease.'
    }
  },
  {
    id: 13,
    disease: { zh: '轻度便秘', en: 'Mild Constipation' },
    treatmentDays: 3,
    category: 'mild',
    question: {
      zh: '预防便秘最有效的饮食建议是什么？',
      en: 'What is the most effective dietary advice for preventing constipation?'
    },
    options: {
      zh: ['增加膳食纤维摄入', '减少水分摄入', '多吃肉类', '少吃蔬菜'],
      en: ['Increase dietary fiber intake', 'Reduce water intake', 'Eat more meat', 'Eat fewer vegetables']
    },
    correctAnswer: 0,
    explanation: {
      zh: '膳食纤维能增加粪便体积，促进肠道蠕动，是预防便秘的关键。',
      en: 'Dietary fiber increases stool bulk and promotes bowel movements, which is key to preventing constipation.'
    }
  },
  {
    id: 14,
    disease: { zh: '轻微过敏', en: 'Mild Allergy' },
    treatmentDays: 3,
    category: 'mild',
    question: {
      zh: '季节性过敏最常见的触发因素是什么？',
      en: 'What is the most common trigger for seasonal allergies?'
    },
    options: {
      zh: ['花粉', '尘螨', '宠物毛发', '食物'],
      en: ['Pollen', 'Dust mites', 'Pet dander', 'Food']
    },
    correctAnswer: 0,
    explanation: {
      zh: '花粉是季节性过敏（花粉症）最常见的触发因素，在春季和秋季尤为明显。',
      en: 'Pollen is the most common trigger for seasonal allergies (hay fever), especially prominent in spring and fall.'
    }
  },
  {
    id: 15,
    disease: { zh: '肌肉酸痛', en: 'Muscle Soreness' },
    treatmentDays: 3,
    category: 'mild',
    question: {
      zh: '运动后延迟性肌肉酸痛（DOMS）通常在什么时候出现？',
      en: 'When does delayed onset muscle soreness (DOMS) typically appear after exercise?'
    },
    options: {
      zh: ['运动后24-48小时', '运动后立即', '运动后1周', '运动后1个月'],
      en: ['24-48 hours after exercise', 'Immediately after exercise', '1 week after exercise', '1 month after exercise']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'DOMS通常在运动后24-48小时达到高峰，是肌肉微小损伤的正常反应。',
      en: 'DOMS typically peaks 24-48 hours after exercise and is a normal response to microscopic muscle damage.'
    }
  },
  {
    id: 16,
    disease: { zh: '轻度晒伤', en: 'Mild Sunburn' },
    treatmentDays: 4,
    category: 'mild',
    question: {
      zh: '晒伤后皮肤发红的原因是什么？',
      en: 'What causes skin redness after sunburn?'
    },
    options: {
      zh: ['紫外线导致的血管扩张和炎症', '皮肤干燥', '过敏反应', '细菌感染'],
      en: ['Vasodilation and inflammation from UV rays', 'Dry skin', 'Allergic reaction', 'Bacterial infection']
    },
    correctAnswer: 0,
    explanation: {
      zh: '紫外线损伤皮肤细胞，导致血管扩张和炎症反应，表现为发红和疼痛。',
      en: 'UV rays damage skin cells, causing vasodilation and inflammation, resulting in redness and pain.'
    }
  },
  {
    id: 17,
    disease: { zh: '轻度湿疹', en: 'Mild Eczema' },
    treatmentDays: 7,
    category: 'mild',
    question: {
      zh: '湿疹患者皮肤护理的关键是什么？',
      en: 'What is the key to skin care for eczema patients?'
    },
    options: {
      zh: ['保持皮肤湿润', '频繁使用肥皂', '用热水洗澡', '避免所有护肤品'],
      en: ['Keep skin moisturized', 'Use soap frequently', 'Take hot showers', 'Avoid all skincare products']
    },
    correctAnswer: 0,
    explanation: {
      zh: '湿疹皮肤屏障功能受损，保持湿润是基础护理的关键。',
      en: 'Eczema skin has impaired barrier function, so keeping it moisturized is key to basic care.'
    }
  },
  {
    id: 18,
    disease: { zh: '口腔溃疡', en: 'Mouth Ulcer' },
    treatmentDays: 7,
    category: 'mild',
    question: {
      zh: '复发性口腔溃疡最常见的类型是什么？',
      en: 'What is the most common type of recurrent mouth ulcers?'
    },
    options: {
      zh: ['轻型阿弗他溃疡', '疱疹性溃疡', '创伤性溃疡', '癌性溃疡'],
      en: ['Minor aphthous ulcer', 'Herpetic ulcer', 'Traumatic ulcer', 'Cancerous ulcer']
    },
    correctAnswer: 0,
    explanation: {
      zh: '轻型阿弗他溃疡是最常见的类型，通常7-14天自愈，不留疤痕。',
      en: 'Minor aphthous ulcers are the most common type, usually healing on their own in 7-14 days without scarring.'
    }
  },
  {
    id: 19,
    disease: { zh: '轻度痔疮', en: 'Mild Hemorrhoids' },
    treatmentDays: 5,
    category: 'mild',
    question: {
      zh: '预防痔疮最重要的生活习惯是什么？',
      en: 'What is the most important lifestyle habit for preventing hemorrhoids?'
    },
    options: {
      zh: ['避免久坐和便秘', '多吃辛辣食物', '减少运动', '长时间如厕'],
      en: ['Avoid prolonged sitting and constipation', 'Eat more spicy food', 'Reduce exercise', 'Long toilet time']
    },
    correctAnswer: 0,
    explanation: {
      zh: '久坐和便秘会增加肛门静脉压力，是痔疮的主要诱因。',
      en: 'Prolonged sitting and constipation increase pressure on anal veins, which are the main triggers for hemorrhoids.'
    }
  },
  {
    id: 20,
    disease: { zh: '轻微扭伤', en: 'Minor Sprain' },
    treatmentDays: 7,
    category: 'mild',
    question: {
      zh: '急性扭伤后的RICE处理原则中的"I"代表什么？',
      en: 'What does the "I" in the RICE treatment principle for acute sprains stand for?'
    },
    options: {
      zh: ['冰敷（Ice）', '压迫（Immobilization）', '注射（Injection）', '手术（Intervention）'],
      en: ['Ice', 'Immobilization', 'Injection', 'Intervention']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'RICE原则：Rest（休息）、Ice（冰敷）、Compression（压迫）、Elevation（抬高），用于急性损伤处理。',
      en: 'RICE principle: Rest, Ice, Compression, Elevation, used for acute injury management.'
    }
  },
  {
    id: 21,
    disease: { zh: '流行性感冒', en: 'Influenza' },
    treatmentDays: 10,
    category: 'common',
    question: {
      zh: '流感与普通感冒的主要区别是什么？',
      en: 'What is the main difference between influenza and the common cold?'
    },
    options: {
      zh: ['流感症状更严重，常伴高热', '流感只影响儿童', '感冒不会流鼻涕', '两者没有区别'],
      en: ['Flu symptoms are more severe, often with high fever', 'Flu only affects children', 'Colds don\'t cause runny nose', 'There is no difference']
    },
    correctAnswer: 0,
    explanation: {
      zh: '流感症状通常更严重，常伴高热、全身酸痛和极度疲劳，而感冒症状较轻。',
      en: 'Flu symptoms are usually more severe, often with high fever, body aches, and extreme fatigue, while cold symptoms are milder.'
    }
  },
  {
    id: 22,
    disease: { zh: '急性支气管炎', en: 'Acute Bronchitis' },
    treatmentDays: 14,
    category: 'common',
    question: {
      zh: '急性支气管炎最常见的病因是什么？',
      en: 'What is the most common cause of acute bronchitis?'
    },
    options: {
      zh: ['病毒感染', '细菌感染', '真菌感染', '过敏反应'],
      en: ['Viral infection', 'Bacterial infection', 'Fungal infection', 'Allergic reaction']
    },
    correctAnswer: 0,
    explanation: {
      zh: '急性支气管炎大多数由病毒引起，如流感病毒、腺病毒等。',
      en: 'Most acute bronchitis is caused by viruses, such as influenza virus and adenovirus.'
    }
  },
  {
    id: 23,
    disease: { zh: '慢性胃炎', en: 'Chronic Gastritis' },
    treatmentDays: 30,
    category: 'common',
    question: {
      zh: '慢性胃炎最常见的病因是什么？',
      en: 'What is the most common cause of chronic gastritis?'
    },
    options: {
      zh: ['幽门螺杆菌感染', '病毒感染', '遗传因素', '年龄增长'],
      en: ['Helicobacter pylori infection', 'Viral infection', 'Genetic factors', 'Aging']
    },
    correctAnswer: 0,
    explanation: {
      zh: '幽门螺杆菌（H. pylori）感染是慢性胃炎最主要的病因，可通过抗生素治疗。',
      en: 'Helicobacter pylori infection is the main cause of chronic gastritis and can be treated with antibiotics.'
    }
  },
  {
    id: 24,
    disease: { zh: '尿路感染', en: 'Urinary Tract Infection' },
    treatmentDays: 7,
    category: 'common',
    question: {
      zh: '尿路感染最常见的症状是什么？',
      en: 'What is the most common symptom of a urinary tract infection?'
    },
    options: {
      zh: ['尿频、尿急、尿痛', '腰痛', '发热', '血尿'],
      en: ['Frequent urination, urgency, dysuria', 'Back pain', 'Fever', 'Blood in urine']
    },
    correctAnswer: 0,
    explanation: {
      zh: '尿路感染的典型症状是尿频、尿急、尿痛，称为膀胱刺激征。',
      en: 'The typical symptoms of UTI are frequent urination, urgency, and dysuria, known as bladder irritation signs.'
    }
  },
  {
    id: 25,
    disease: { zh: '急性胃肠炎', en: 'Acute Gastroenteritis' },
    treatmentDays: 5,
    category: 'common',
    question: {
      zh: '病毒性胃肠炎最重要的治疗是什么？',
      en: 'What is the most important treatment for viral gastroenteritis?'
    },
    options: {
      zh: ['补液防止脱水', '立即使用抗生素', '止吐药', '止泻药'],
      en: ['Fluid replacement to prevent dehydration', 'Immediate antibiotic use', 'Antiemetics', 'Antidiarrheals']
    },
    correctAnswer: 0,
    explanation: {
      zh: '病毒性胃肠炎主要是支持性治疗，防止脱水是最关键的。',
      en: 'Viral gastroenteritis is mainly supportive treatment, with preventing dehydration being the most critical.'
    }
  },
  {
    id: 26,
    disease: { zh: '扁桃体炎', en: 'Tonsillitis' },
    treatmentDays: 10,
    category: 'common',
    question: {
      zh: '细菌性扁桃体炎的首选抗生素是什么？',
      en: 'What is the first-line antibiotic for bacterial tonsillitis?'
    },
    options: {
      zh: ['青霉素', '头孢菌素', '大环内酯类', '喹诺酮类'],
      en: ['Penicillin', 'Cephalosporins', 'Macrolides', 'Fluoroquinolones']
    },
    correctAnswer: 0,
    explanation: {
      zh: '青霉素是治疗链球菌性扁桃体炎的首选药物。',
      en: 'Penicillin is the first-line treatment for streptococcal tonsillitis.'
    }
  },
  {
    id: 27,
    disease: { zh: '鼻窦炎', en: 'Sinusitis' },
    treatmentDays: 14,
    category: 'common',
    question: {
      zh: '急性鼻窦炎最常见的症状是什么？',
      en: 'What is the most common symptom of acute sinusitis?'
    },
    options: {
      zh: ['面部疼痛和压力感', '听力下降', '喉咙痛', '胸痛'],
      en: ['Facial pain and pressure', 'Hearing loss', 'Sore throat', 'Chest pain']
    },
    correctAnswer: 0,
    explanation: {
      zh: '鼻窦炎典型症状是面部疼痛、压力感、鼻塞和脓性分泌物。',
      en: 'Typical symptoms of sinusitis are facial pain, pressure, nasal congestion, and purulent discharge.'
    }
  },
  {
    id: 28,
    disease: { zh: '中耳炎', en: 'Otitis Media' },
    treatmentDays: 10,
    category: 'common',
    question: {
      zh: '儿童急性中耳炎最常见的病原体是什么？',
      en: 'What is the most common pathogen in acute otitis media in children?'
    },
    options: {
      zh: ['肺炎链球菌', '流感嗜血杆菌', '卡他莫拉菌', '金黄色葡萄球菌'],
      en: ['Streptococcus pneumoniae', 'Haemophilus influenzae', 'Moraxella catarrhalis', 'Staphylococcus aureus']
    },
    correctAnswer: 0,
    explanation: {
      zh: '肺炎链球菌是儿童急性中耳炎最常见的细菌病原体。',
      en: 'Streptococcus pneumoniae is the most common bacterial pathogen in acute otitis media in children.'
    }
  },
  {
    id: 29,
    disease: { zh: '结膜炎', en: 'Conjunctivitis' },
    treatmentDays: 7,
    category: 'common',
    question: {
      zh: '细菌性结膜炎的典型症状是什么？',
      en: 'What is the typical symptom of bacterial conjunctivitis?'
    },
    options: {
      zh: ['眼部分泌物增多，眼睑粘连', '视力急剧下降', '眼内压升高', '瞳孔散大'],
      en: ['Increased eye discharge, eyelids stuck together', 'Rapid vision loss', 'Increased intraocular pressure', 'Pupil dilation']
    },
    correctAnswer: 0,
    explanation: {
      zh: '细菌性结膜炎典型表现为大量脓性分泌物，晨起时眼睑粘连。',
      en: 'Bacterial conjunctivitis typically presents with purulent discharge, with eyelids stuck together in the morning.'
    }
  },
  {
    id: 30,
    disease: { zh: '水痘', en: 'Chickenpox' },
    treatmentDays: 14,
    category: 'common',
    question: {
      zh: '水痘的病原体是什么？',
      en: 'What is the pathogen that causes chickenpox?'
    },
    options: {
      zh: ['水痘-带状疱疹病毒', '单纯疱疹病毒', 'EB病毒', '巨细胞病毒'],
      en: ['Varicella-zoster virus', 'Herpes simplex virus', 'Epstein-Barr virus', 'Cytomegalovirus']
    },
    correctAnswer: 0,
    explanation: {
      zh: '水痘由水痘-带状疱疹病毒（VZV）引起，感染后可潜伏在神经节，日后可能引起带状疱疹。',
      en: 'Chickenpox is caused by the varicella-zoster virus (VZV), which can remain dormant in nerve ganglia and later cause shingles.'
    }
  },
  {
    id: 31,
    disease: { zh: '手足口病', en: 'Hand, Foot, and Mouth Disease' },
    treatmentDays: 10,
    category: 'common',
    question: {
      zh: '手足口病最常见的发病年龄是？',
      en: 'What is the most common age for hand, foot, and mouth disease?'
    },
    options: {
      zh: ['5岁以下儿童', '青少年', '成年人', '老年人'],
      en: ['Children under 5', 'Adolescents', 'Adults', 'Elderly']
    },
    correctAnswer: 0,
    explanation: {
      zh: '手足口病主要影响5岁以下儿童，由肠道病毒引起，具有高度传染性。',
      en: 'Hand, foot, and mouth disease mainly affects children under 5, caused by enteroviruses and highly contagious.'
    }
  },
  {
    id: 32,
    disease: { zh: '腮腺炎', en: 'Mumps' },
    treatmentDays: 14,
    category: 'common',
    question: {
      zh: '流行性腮腺炎最常见的并发症是什么？',
      en: 'What is the most common complication of mumps?'
    },
    options: {
      zh: ['睾丸炎（男性）', '脑膜炎', '肺炎', '心肌炎'],
      en: ['Orchitis (in males)', 'Meningitis', 'Pneumonia', 'Myocarditis']
    },
    correctAnswer: 0,
    explanation: {
      zh: '青春期后男性患腮腺炎时，睾丸炎是常见并发症，可能导致不育。',
      en: 'In post-pubertal males with mumps, orchitis is a common complication that may lead to infertility.'
    }
  },
  {
    id: 33,
    disease: { zh: '风疹', en: 'Rubella' },
    treatmentDays: 7,
    category: 'common',
    question: {
      zh: '风疹对孕妇的最大风险是什么？',
      en: 'What is the greatest risk of rubella for pregnant women?'
    },
    options: {
      zh: ['胎儿先天性缺陷', '孕妇死亡', '早产', '流产'],
      en: ['Fetal congenital defects', 'Maternal death', 'Premature birth', 'Miscarriage']
    },
    correctAnswer: 0,
    explanation: {
      zh: '孕早期感染风疹可导致先天性风疹综合征，引起胎儿心脏缺陷、耳聋、白内障等。',
      en: 'Rubella infection in early pregnancy can cause congenital rubella syndrome, leading to fetal heart defects, deafness, cataracts, etc.'
    }
  },
  {
    id: 34,
    disease: { zh: '百日咳', en: 'Whooping Cough' },
    treatmentDays: 21,
    category: 'common',
    question: {
      zh: '百日咳的典型症状是什么？',
      en: 'What is the typical symptom of whooping cough?'
    },
    options: {
      zh: ['阵发性痉挛性咳嗽伴鸡鸣样吸气声', '持续高热', '皮疹', '腹泻'],
      en: ['Paroxysmal spasmodic cough with whooping inspiration', 'Persistent high fever', 'Rash', 'Diarrhea']
    },
    correctAnswer: 0,
    explanation: {
      zh: '百日咳特征是阵发性痉挛性咳嗽，咳嗽末伴有高调鸡鸣样吸气声。',
      en: 'Whooping cough is characterized by paroxysmal spasmodic coughing, followed by a high-pitched whooping inspiration.'
    }
  },
  {
    id: 35,
    disease: { zh: '急性咽炎', en: 'Acute Pharyngitis' },
    treatmentDays: 7,
    category: 'common',
    question: {
      zh: '急性咽炎最常见的病因是什么？',
      en: 'What is the most common cause of acute pharyngitis?'
    },
    options: {
      zh: ['病毒感染', '细菌感染', '真菌感染', '过敏反应'],
      en: ['Viral infection', 'Bacterial infection', 'Fungal infection', 'Allergic reaction']
    },
    correctAnswer: 0,
    explanation: {
      zh: '大多数急性咽炎由病毒引起，如鼻病毒、冠状病毒、腺病毒等。',
      en: 'Most acute pharyngitis is caused by viruses, such as rhinovirus, coronavirus, adenovirus, etc.'
    }
  },
  {
    id: 36,
    disease: { zh: '急性扁桃体炎', en: 'Acute Tonsillitis' },
    treatmentDays: 10,
    category: 'common',
    question: {
      zh: '反复发作的扁桃体炎何时考虑手术切除？',
      en: 'When is surgical removal considered for recurrent tonsillitis?'
    },
    options: {
      zh: ['每年发作7次以上或连续2年每年5次以上', '首次发作后', '每2年发作1次', '从不考虑手术'],
      en: ['More than 7 episodes per year or 5+ per year for 2 consecutive years', 'After first episode', 'Once every 2 years', 'Never consider surgery']
    },
    correctAnswer: 0,
    explanation: {
      zh: '扁桃体切除的指征：每年发作7次以上，或连续2年每年5次以上，或连续3年每年3次以上。',
      en: 'Indications for tonsillectomy: 7+ episodes per year, or 5+ per year for 2 consecutive years, or 3+ per year for 3 consecutive years.'
    }
  },
  {
    id: 37,
    disease: { zh: '急性膀胱炎', en: 'Acute Cystitis' },
    treatmentDays: 7,
    category: 'common',
    question: {
      zh: '女性比男性更容易患尿路感染的原因是什么？',
      en: 'Why are women more prone to UTIs than men?'
    },
    options: {
      zh: ['女性尿道较短', '女性免疫力较低', '女性喝水较少', '女性激素水平'],
      en: ['Women have a shorter urethra', 'Women have lower immunity', 'Women drink less water', 'Women\'s hormone levels']
    },
    correctAnswer: 0,
    explanation: {
      zh: '女性尿道较短（约4cm），细菌更容易进入膀胱，因此更易感染。',
      en: 'Women have a shorter urethra (about 4cm), making it easier for bacteria to enter the bladder and cause infection.'
    }
  },
  {
    id: 38,
    disease: { zh: '皮肤真菌感染', en: 'Fungal Skin Infection' },
    treatmentDays: 21,
    category: 'common',
    question: {
      zh: '足癣（脚气）最常见的类型是什么？',
      en: 'What is the most common type of athlete\'s foot?'
    },
    options: {
      zh: ['趾间型', '水疱型', '鳞屑角化型', '急性溃疡型'],
      en: ['Interdigital type', 'Vesicular type', 'Moccasin type', 'Acute ulcerative type']
    },
    correctAnswer: 0,
    explanation: {
      zh: '趾间型足癣最常见，表现为趾间皮肤浸渍、发白、脱屑。',
      en: 'The interdigital type is most common, presenting with macerated, white, scaling skin between the toes.'
    }
  },
  {
    id: 39,
    disease: { zh: '带状疱疹', en: 'Shingles' },
    treatmentDays: 21,
    category: 'common',
    question: {
      zh: '带状疱疹的病因是什么？',
      en: 'What causes shingles?'
    },
    options: {
      zh: ['水痘-带状疱疹病毒再激活', '新感染水痘病毒', '细菌感染', '自身免疫疾病'],
      en: ['Reactivation of varicella-zoster virus', 'New chickenpox virus infection', 'Bacterial infection', 'Autoimmune disease']
    },
    correctAnswer: 0,
    explanation: {
      zh: '带状疱疹是潜伏在神经节的水痘-带状疱疹病毒再激活引起的。',
      en: 'Shingles is caused by reactivation of varicella-zoster virus dormant in nerve ganglia.'
    }
  },
  {
    id: 40,
    disease: { zh: '荨麻疹', en: 'Urticaria' },
    treatmentDays: 14,
    category: 'common',
    question: {
      zh: '急性荨麻疹最常见的病因是什么？',
      en: 'What is the most common cause of acute urticaria?'
    },
    options: {
      zh: ['食物或药物过敏', '感染', '自身免疫', '遗传因素'],
      en: ['Food or drug allergy', 'Infection', 'Autoimmune', 'Genetic factors']
    },
    correctAnswer: 0,
    explanation: {
      zh: '急性荨麻疹常由食物（海鲜、坚果）或药物（青霉素）过敏引起。',
      en: 'Acute urticaria is often caused by food (seafood, nuts) or drug (penicillin) allergies.'
    }
  },
  {
    id: 41,
    disease: { zh: '过敏性鼻炎', en: 'Allergic Rhinitis' },
    treatmentDays: 30,
    category: 'common',
    question: {
      zh: '过敏性鼻炎的四大典型症状是什么？',
      en: 'What are the four typical symptoms of allergic rhinitis?'
    },
    options: {
      zh: ['打喷嚏、流涕、鼻塞、鼻痒', '鼻塞、头痛、发热、咳嗽', '流涕、喉咙痛、发热、乏力', '鼻出血、头痛、视力模糊、耳鸣'],
      en: ['Sneezing, runny nose, nasal congestion, itchy nose', 'Nasal congestion, headache, fever, cough', 'Runny nose, sore throat, fever, fatigue', 'Nosebleed, headache, blurred vision, tinnitus']
    },
    correctAnswer: 0,
    explanation: {
      zh: '过敏性鼻炎典型症状是阵发性打喷嚏、清水样鼻涕、鼻塞和鼻痒。',
      en: 'Typical symptoms of allergic rhinitis are paroxysmal sneezing, watery runny nose, nasal congestion, and itchy nose.'
    }
  },
  {
    id: 42,
    disease: { zh: '缺铁性贫血', en: 'Iron Deficiency Anemia' },
    treatmentDays: 90,
    category: 'common',
    question: {
      zh: '缺铁性贫血最常见的症状是什么？',
      en: 'What is the most common symptom of iron deficiency anemia?'
    },
    options: {
      zh: ['疲劳和苍白', '发热', '关节疼痛', '皮疹'],
      en: ['Fatigue and pallor', 'Fever', 'Joint pain', 'Rash']
    },
    correctAnswer: 0,
    explanation: {
      zh: '缺铁性贫血导致血红蛋白减少，组织缺氧，表现为疲劳、苍白、心悸等。',
      en: 'Iron deficiency anemia reduces hemoglobin, causing tissue hypoxia, presenting as fatigue, pallor, palpitations, etc.'
    }
  },
  {
    id: 43,
    disease: { zh: '维生素D缺乏', en: 'Vitamin D Deficiency' },
    treatmentDays: 90,
    category: 'common',
    question: {
      zh: '维生素D缺乏在儿童中可能导致什么疾病？',
      en: 'What disease can vitamin D deficiency cause in children?'
    },
    options: {
      zh: ['佝偻病', '坏血病', '脚气病', '夜盲症'],
      en: ['Rickets', 'Scurvy', 'Beriberi', 'Night blindness']
    },
    correctAnswer: 0,
    explanation: {
      zh: '维生素D缺乏影响钙磷代谢，儿童可导致佝偻病，成人可导致骨软化症。',
      en: 'Vitamin D deficiency affects calcium-phosphorus metabolism, causing rickets in children and osteomalacia in adults.'
    }
  },
  {
    id: 44,
    disease: { zh: '轻度抑郁', en: 'Mild Depression' },
    treatmentDays: 30,
    category: 'common',
    question: {
      zh: '抑郁症的核心症状是什么？',
      en: 'What are the core symptoms of depression?'
    },
    options: {
      zh: ['持续情绪低落和兴趣丧失', '焦虑和紧张', '记忆力和注意力下降', '睡眠障碍'],
      en: ['Persistent low mood and loss of interest', 'Anxiety and tension', 'Memory and attention decline', 'Sleep disorders']
    },
    correctAnswer: 0,
    explanation: {
      zh: '抑郁症的核心症状是持续情绪低落、兴趣或愉悦感丧失，持续至少2周。',
      en: 'Core symptoms of depression are persistent low mood and loss of interest or pleasure, lasting at least 2 weeks.'
    }
  },
  {
    id: 45,
    disease: { zh: '焦虑症', en: 'Anxiety Disorder' },
    treatmentDays: 30,
    category: 'common',
    question: {
      zh: '广泛性焦虑症的主要特征是什么？',
      en: 'What is the main characteristic of generalized anxiety disorder?'
    },
    options: {
      zh: ['过度、难以控制的担忧', '恐惧特定物体', '反复出现的强迫行为', '社交回避'],
      en: ['Excessive, uncontrollable worry', 'Fear of specific objects', 'Recurring compulsive behaviors', 'Social avoidance']
    },
    correctAnswer: 0,
    explanation: {
      zh: '广泛性焦虑症特征是持续、过度的担忧，难以控制，影响日常生活。',
      en: 'Generalized anxiety disorder is characterized by persistent, excessive worry that is difficult to control and affects daily life.'
    }
  },
  {
    id: 46,
    disease: { zh: '失眠症', en: 'Insomnia' },
    treatmentDays: 30,
    category: 'common',
    question: {
      zh: '慢性失眠的诊断标准是什么？',
      en: 'What is the diagnostic criteria for chronic insomnia?'
    },
    options: {
      zh: ['每周至少3晚，持续3个月以上', '每晚睡眠少于4小时', '偶尔入睡困难', '白天嗜睡'],
      en: ['At least 3 nights per week for 3+ months', 'Less than 4 hours of sleep per night', 'Occasional difficulty falling asleep', 'Daytime sleepiness']
    },
    correctAnswer: 0,
    explanation: {
      zh: '慢性失眠诊断标准：入睡困难、睡眠维持困难或早醒，每周至少3晚，持续3个月以上。',
      en: 'Chronic insomnia criteria: difficulty falling asleep, maintaining sleep, or early awakening, at least 3 nights per week for 3+ months.'
    }
  },
  {
    id: 47,
    disease: { zh: '紧张性头痛', en: 'Tension Headache' },
    treatmentDays: 7,
    category: 'common',
    question: {
      zh: '紧张性头痛的典型表现是什么？',
      en: 'What is the typical presentation of tension headache?'
    },
    options: {
      zh: ['双侧头部压迫感或紧箍感', '单侧搏动性疼痛', '伴视觉先兆', '剧烈呕吐'],
      en: ['Bilateral head pressure or tightness', 'Unilateral throbbing pain', 'With visual aura', 'Severe vomiting']
    },
    correctAnswer: 0,
    explanation: {
      zh: '紧张性头痛典型表现为双侧头部压迫感、紧箍感，轻至中度疼痛。',
      en: 'Tension headache typically presents with bilateral head pressure, tightness, and mild to moderate pain.'
    }
  },
  {
    id: 48,
    disease: { zh: '偏头痛', en: 'Migraine' },
    treatmentDays: 14,
    category: 'common',
    question: {
      zh: '偏头痛的典型特征是什么？',
      en: 'What is the typical characteristic of migraine?'
    },
    options: {
      zh: ['单侧搏动性头痛，伴恶心和光敏感', '双侧压迫性头痛', '持续性钝痛', '突然剧烈头痛'],
      en: ['Unilateral throbbing headache with nausea and photophobia', 'Bilateral pressure headache', 'Persistent dull pain', 'Sudden severe headache']
    },
    correctAnswer: 0,
    explanation: {
      zh: '偏头痛典型表现为单侧搏动性头痛，常伴恶心、呕吐、光和声音敏感。',
      en: 'Migraine typically presents with unilateral throbbing headache, often with nausea, vomiting, and light/sound sensitivity.'
    }
  },
  {
    id: 49,
    disease: { zh: '牙龈炎', en: 'Gingivitis' },
    treatmentDays: 14,
    category: 'common',
    question: {
      zh: '牙龈炎最常见的病因是什么？',
      en: 'What is the most common cause of gingivitis?'
    },
    options: {
      zh: ['牙菌斑积累', '维生素C缺乏', '遗传因素', '激素变化'],
      en: ['Plaque accumulation', 'Vitamin C deficiency', 'Genetic factors', 'Hormonal changes']
    },
    correctAnswer: 0,
    explanation: {
      zh: '牙菌斑是牙龈炎的主要病因，良好的口腔卫生可以预防和治疗。',
      en: 'Plaque is the main cause of gingivitis, and good oral hygiene can prevent and treat it.'
    }
  },
  {
    id: 50,
    disease: { zh: '牙周炎', en: 'Periodontitis' },
    treatmentDays: 30,
    category: 'common',
    question: {
      zh: '牙周炎与牙龈炎的主要区别是什么？',
      en: 'What is the main difference between periodontitis and gingivitis?'
    },
    options: {
      zh: ['牙周炎有牙槽骨吸收', '牙龈炎更严重', '两者没有区别', '牙周炎不出血'],
      en: ['Periodontitis has alveolar bone resorption', 'Gingivitis is more severe', 'There is no difference', 'Periodontitis doesn\'t bleed']
    },
    correctAnswer: 0,
    explanation: {
      zh: '牙周炎的特征是牙周支持组织破坏，包括牙槽骨吸收，可导致牙齿松动。',
      en: 'Periodontitis is characterized by destruction of periodontal supporting tissues, including alveolar bone resorption, which can lead to tooth loosening.'
    }
  },
  {
    id: 51,
    disease: { zh: '肺炎', en: 'Pneumonia' },
    treatmentDays: 21,
    category: 'serious',
    question: {
      zh: '社区获得性肺炎最常见的病原体是什么？',
      en: 'What is the most common pathogen in community-acquired pneumonia?'
    },
    options: {
      zh: ['肺炎链球菌', '流感嗜血杆菌', '肺炎支原体', '金黄色葡萄球菌'],
      en: ['Streptococcus pneumoniae', 'Haemophilus influenzae', 'Mycoplasma pneumoniae', 'Staphylococcus aureus']
    },
    correctAnswer: 0,
    explanation: {
      zh: '肺炎链球菌是社区获得性肺炎最常见的细菌病原体。',
      en: 'Streptococcus pneumoniae is the most common bacterial pathogen in community-acquired pneumonia.'
    }
  },
  {
    id: 52,
    disease: { zh: '冠心病', en: 'Coronary Heart Disease' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '冠心病的主要危险因素是什么？',
      en: 'What are the main risk factors for coronary heart disease?'
    },
    options: {
      zh: ['高血压、高血脂、吸烟、糖尿病', '年龄增长', '遗传因素', '缺乏运动'],
      en: ['Hypertension, hyperlipidemia, smoking, diabetes', 'Aging', 'Genetic factors', 'Lack of exercise']
    },
    correctAnswer: 0,
    explanation: {
      zh: '冠心病的主要可改变危险因素包括高血压、高血脂、吸烟、糖尿病、肥胖等。',
      en: 'Main modifiable risk factors for CHD include hypertension, hyperlipidemia, smoking, diabetes, obesity, etc.'
    }
  },
  {
    id: 53,
    disease: { zh: '高血压', en: 'Hypertension' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '成人高血压的诊断标准是什么？',
      en: 'What is the diagnostic criteria for hypertension in adults?'
    },
    options: {
      zh: ['收缩压≥140mmHg和/或舒张压≥90mmHg', '收缩压≥120mmHg', '收缩压≥130mmHg', '舒张压≥80mmHg'],
      en: ['Systolic ≥140mmHg and/or diastolic ≥90mmHg', 'Systolic ≥120mmHg', 'Systolic ≥130mmHg', 'Diastolic ≥80mmHg']
    },
    correctAnswer: 0,
    explanation: {
      zh: '根据中国指南，成人高血压诊断标准为收缩压≥140mmHg和/或舒张压≥90mmHg。',
      en: 'According to Chinese guidelines, hypertension diagnosis is systolic ≥140mmHg and/or diastolic ≥90mmHg.'
    }
  },
  {
    id: 54,
    disease: { zh: '2型糖尿病', en: 'Type 2 Diabetes' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '2型糖尿病的主要特征是什么？',
      en: 'What is the main characteristic of type 2 diabetes?'
    },
    options: {
      zh: ['胰岛素抵抗和相对胰岛素分泌不足', '胰岛素绝对缺乏', '自身免疫破坏胰岛细胞', '胰高血糖素分泌过多'],
      en: ['Insulin resistance and relative insulin deficiency', 'Absolute insulin deficiency', 'Autoimmune destruction of islet cells', 'Excess glucagon secretion']
    },
    correctAnswer: 0,
    explanation: {
      zh: '2型糖尿病特征是胰岛素抵抗伴相对胰岛素分泌不足，占糖尿病的90%以上。',
      en: 'Type 2 diabetes is characterized by insulin resistance with relative insulin deficiency, accounting for over 90% of diabetes cases.'
    }
  },
  {
    id: 55,
    disease: { zh: '慢性阻塞性肺疾病', en: 'COPD' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: 'COPD最常见的病因是什么？',
      en: 'What is the most common cause of COPD?'
    },
    options: {
      zh: ['长期吸烟', '空气污染', '遗传因素', '职业粉尘暴露'],
      en: ['Long-term smoking', 'Air pollution', 'Genetic factors', 'Occupational dust exposure']
    },
    correctAnswer: 0,
    explanation: {
      zh: '吸烟是COPD最重要的环境危险因素，约80-90%的COPD与吸烟有关。',
      en: 'Smoking is the most important environmental risk factor for COPD, with about 80-90% of cases related to smoking.'
    }
  },
  {
    id: 56,
    disease: { zh: '支气管哮喘', en: 'Bronchial Asthma' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '哮喘的本质是什么？',
      en: 'What is the nature of asthma?'
    },
    options: {
      zh: ['慢性气道炎症', '气道感染', '气道肿瘤', '气道异物'],
      en: ['Chronic airway inflammation', 'Airway infection', 'Airway tumor', 'Airway foreign body']
    },
    correctAnswer: 0,
    explanation: {
      zh: '哮喘本质是慢性气道炎症，导致气道高反应性和可逆性气流受限。',
      en: 'Asthma is essentially chronic airway inflammation, leading to airway hyperresponsiveness and reversible airflow limitation.'
    }
  },
  {
    id: 57,
    disease: { zh: '消化性溃疡', en: 'Peptic Ulcer' },
    treatmentDays: 60,
    category: 'serious',
    question: {
      zh: '消化性溃疡最常见的并发症是什么？',
      en: 'What is the most common complication of peptic ulcer?'
    },
    options: {
      zh: ['出血', '穿孔', '幽门梗阻', '癌变'],
      en: ['Bleeding', 'Perforation', 'Pyloric obstruction', 'Malignant transformation']
    },
    correctAnswer: 0,
    explanation: {
      zh: '出血是消化性溃疡最常见的并发症，表现为黑便或呕血。',
      en: 'Bleeding is the most common complication of peptic ulcer, presenting as black stool or hematemesis.'
    }
  },
  {
    id: 58,
    disease: { zh: '慢性肝炎', en: 'Chronic Hepatitis' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '慢性乙型肝炎的主要传播途径是什么？',
      en: 'What are the main transmission routes of chronic hepatitis B?'
    },
    options: {
      zh: ['血液、性接触、母婴传播', '消化道传播', '呼吸道传播', '日常接触'],
      en: ['Blood, sexual contact, mother-to-child', 'Digestive tract', 'Respiratory tract', 'Daily contact']
    },
    correctAnswer: 0,
    explanation: {
      zh: '乙肝主要通过血液、性接触和母婴传播，不通过消化道和呼吸道传播。',
      en: 'Hepatitis B is mainly transmitted through blood, sexual contact, and mother-to-child, not through digestive or respiratory tracts.'
    }
  },
  {
    id: 59,
    disease: { zh: '肝硬化', en: 'Liver Cirrhosis' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '肝硬化最常见的病因是什么？',
      en: 'What is the most common cause of liver cirrhosis?'
    },
    options: {
      zh: ['慢性病毒性肝炎（乙肝、丙肝）', '酒精性肝病', '自身免疫性肝病', '药物性肝损伤'],
      en: ['Chronic viral hepatitis (B, C)', 'Alcoholic liver disease', 'Autoimmune liver disease', 'Drug-induced liver injury']
    },
    correctAnswer: 0,
    explanation: {
      zh: '在中国，慢性乙型肝炎是肝硬化最常见的病因；在西方，酒精性肝病更常见。',
      en: 'In China, chronic hepatitis B is the most common cause; in the West, alcoholic liver disease is more common.'
    }
  },
  {
    id: 60,
    disease: { zh: '慢性肾病', en: 'Chronic Kidney Disease' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '慢性肾病最常见的病因是什么？',
      en: 'What are the most common causes of chronic kidney disease?'
    },
    options: {
      zh: ['糖尿病和高血压', '肾小球肾炎', '多囊肾', '肾结石'],
      en: ['Diabetes and hypertension', 'Glomerulonephritis', 'Polycystic kidney', 'Kidney stones']
    },
    correctAnswer: 0,
    explanation: {
      zh: '糖尿病和高血压是慢性肾病最常见的两大病因，占终末期肾病的大多数。',
      en: 'Diabetes and hypertension are the two most common causes of CKD, accounting for most end-stage renal disease.'
    }
  },
  {
    id: 61,
    disease: { zh: '甲状腺功能亢进', en: 'Hyperthyroidism' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: 'Graves病（毒性弥漫性甲状腺肿）的典型表现是什么？',
      en: 'What is the typical presentation of Graves\' disease?'
    },
    options: {
      zh: ['甲状腺毒症、突眼、胫前黏液水肿', '甲状腺结节', '甲状腺疼痛', '甲状腺功能减退'],
      en: ['Thyrotoxicosis, exophthalmos, pretibial myxedema', 'Thyroid nodules', 'Thyroid pain', 'Hypothyroidism']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'Graves病典型三联征：甲状腺毒症、浸润性突眼、胫前黏液性水肿。',
      en: 'Graves\' disease classic triad: thyrotoxicosis, infiltrative exophthalmos, pretibial myxedema.'
    }
  },
  {
    id: 62,
    disease: { zh: '甲状腺功能减退', en: 'Hypothyroidism' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '甲状腺功能减退最常见的原因是什么？',
      en: 'What is the most common cause of hypothyroidism?'
    },
    options: {
      zh: ['桥本甲状腺炎', '碘缺乏', '甲状腺手术', '放射性碘治疗'],
      en: ['Hashimoto\'s thyroiditis', 'Iodine deficiency', 'Thyroid surgery', 'Radioactive iodine treatment']
    },
    correctAnswer: 0,
    explanation: {
      zh: '在碘充足地区，桥本甲状腺炎（自身免疫性甲状腺炎）是甲减最常见的原因。',
      en: 'In iodine-sufficient areas, Hashimoto\'s thyroiditis (autoimmune thyroiditis) is the most common cause of hypothyroidism.'
    }
  },
  {
    id: 63,
    disease: { zh: '类风湿关节炎', en: 'Rheumatoid Arthritis' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '类风湿关节炎的典型表现是什么？',
      en: 'What is the typical presentation of rheumatoid arthritis?'
    },
    options: {
      zh: ['对称性小关节炎，晨僵>1小时', '单侧大关节炎', '脊柱关节炎', '急性化脓性关节炎'],
      en: ['Symmetric small joint arthritis, morning stiffness >1 hour', 'Unilateral large joint arthritis', 'Spinal arthritis', 'Acute septic arthritis']
    },
    correctAnswer: 0,
    explanation: {
      zh: '类风湿关节炎典型表现为对称性小关节（手指、腕）炎症，晨僵持续1小时以上。',
      en: 'RA typically presents with symmetric small joint (fingers, wrists) inflammation, morning stiffness lasting over 1 hour.'
    }
  },
  {
    id: 64,
    disease: { zh: '系统性红斑狼疮', en: 'Systemic Lupus Erythematosus' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: 'SLE最特征性的皮肤表现是什么？',
      en: 'What is the most characteristic skin manifestation of SLE?'
    },
    options: {
      zh: ['面部蝶形红斑', '盘状红斑', '光过敏', '口腔溃疡'],
      en: ['Malar butterfly rash', 'Discoid rash', 'Photosensitivity', 'Oral ulcers']
    },
    correctAnswer: 0,
    explanation: {
      zh: '面部蝶形红斑是SLE最特征性的表现，跨越鼻梁和双侧面颊。',
      en: 'Malar butterfly rash is the most characteristic manifestation of SLE, crossing the nasal bridge and both cheeks.'
    }
  },
  {
    id: 65,
    disease: { zh: '痛风', en: 'Gout' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '痛风的根本原因是什么？',
      en: 'What is the root cause of gout?'
    },
    options: {
      zh: ['高尿酸血症', '高血糖', '高血脂', '高血压'],
      en: ['Hyperuricemia', 'Hyperglycemia', 'Hyperlipidemia', 'Hypertension']
    },
    correctAnswer: 0,
    explanation: {
      zh: '痛风是由于尿酸代谢异常导致高尿酸血症，尿酸盐结晶沉积在关节引起炎症。',
      en: 'Gout is caused by abnormal uric acid metabolism leading to hyperuricemia, with urate crystals depositing in joints causing inflammation.'
    }
  },
  {
    id: 66,
    disease: { zh: '骨质疏松症', en: 'Osteoporosis' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '骨质疏松症最严重的后果是什么？',
      en: 'What is the most serious consequence of osteoporosis?'
    },
    options: {
      zh: ['骨折', '骨痛', '身高缩短', '驼背'],
      en: ['Fractures', 'Bone pain', 'Height loss', 'Kyphosis']
    },
    correctAnswer: 0,
    explanation: {
      zh: '骨折是骨质疏松症最严重的后果，常见于脊椎、髋部和腕部。',
      en: 'Fractures are the most serious consequence of osteoporosis, commonly occurring in the spine, hip, and wrist.'
    }
  },
  {
    id: 67,
    disease: { zh: '帕金森病', en: 'Parkinson\'s Disease' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '帕金森病的四大运动症状是什么？',
      en: 'What are the four motor symptoms of Parkinson\'s disease?'
    },
    options: {
      zh: ['静止性震颤、肌强直、运动迟缓、姿势不稳', '震颤、无力、麻木、疼痛', '抽搐、痉挛、瘫痪、萎缩', '头晕、头痛、恶心、呕吐'],
      en: ['Resting tremor, rigidity, bradykinesia, postural instability', 'Tremor, weakness, numbness, pain', 'Convulsions, spasms, paralysis, atrophy', 'Dizziness, headache, nausea, vomiting']
    },
    correctAnswer: 0,
    explanation: {
      zh: '帕金森病主要运动症状：静止性震颤、肌强直、运动迟缓、姿势平衡障碍。',
      en: 'Main motor symptoms of PD: resting tremor, rigidity, bradykinesia, postural balance impairment.'
    }
  },
  {
    id: 68,
    disease: { zh: '阿尔茨海默病', en: 'Alzheimer\'s Disease' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '阿尔茨海默病最早出现的症状通常是什么？',
      en: 'What is usually the first symptom of Alzheimer\'s disease?'
    },
    options: {
      zh: ['近期记忆障碍', '远期记忆丧失', '语言障碍', '运动障碍'],
      en: ['Recent memory impairment', 'Remote memory loss', 'Language impairment', 'Motor impairment']
    },
    correctAnswer: 0,
    explanation: {
      zh: '阿尔茨海默病通常以近期记忆障碍为首发症状，逐渐影响认知功能。',
      en: 'Alzheimer\'s usually begins with recent memory impairment, gradually affecting cognitive function.'
    }
  },
  {
    id: 69,
    disease: { zh: '脑卒中（中风）', en: 'Stroke' },
    treatmentDays: 180,
    category: 'serious',
    question: {
      zh: '缺血性脑卒中溶栓治疗的时间窗是多久？',
      en: 'What is the time window for thrombolytic therapy in ischemic stroke?'
    },
    options: {
      zh: ['发病后4.5小时内', '发病后12小时内', '发病后24小时内', '发病后72小时内'],
      en: ['Within 4.5 hours of onset', 'Within 12 hours of onset', 'Within 24 hours of onset', 'Within 72 hours of onset']
    },
    correctAnswer: 0,
    explanation: {
      zh: '静脉溶栓治疗的时间窗是发病后4.5小时内，越早治疗效果越好。',
      en: 'The time window for IV thrombolysis is within 4.5 hours of onset, earlier is better.'
    }
  },
  {
    id: 70,
    disease: { zh: '心肌梗死', en: 'Myocardial Infarction' },
    treatmentDays: 90,
    category: 'serious',
    question: {
      zh: '急性心肌梗死最典型的症状是什么？',
      en: 'What is the most typical symptom of acute myocardial infarction?'
    },
    options: {
      zh: ['持续剧烈胸痛，含服硝酸甘油不缓解', '短暂胸痛', '心悸', '呼吸困难'],
      en: ['Persistent severe chest pain, not relieved by nitroglycerin', 'Brief chest pain', 'Palpitations', 'Dyspnea']
    },
    correctAnswer: 0,
    explanation: {
      zh: '急性心梗典型表现为持续剧烈胸痛，超过30分钟，含服硝酸甘油不能缓解。',
      en: 'Typical AMI presentation is persistent severe chest pain, over 30 minutes, not relieved by nitroglycerin.'
    }
  },
  {
    id: 71,
    disease: { zh: '心力衰竭', en: 'Heart Failure' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '左心衰竭最典型的症状是什么？',
      en: 'What is the most typical symptom of left heart failure?'
    },
    options: {
      zh: ['呼吸困难（劳力性、端坐呼吸、夜间阵发性）', '下肢水肿', '腹胀', '颈静脉怒张'],
      en: ['Dyspnea (exertional, orthopnea, PND)', 'Lower extremity edema', 'Abdominal distension', 'Jugular venous distension']
    },
    correctAnswer: 0,
    explanation: {
      zh: '左心衰竭主要表现为肺循环淤血，典型症状是不同程度的呼吸困难。',
      en: 'Left heart failure mainly presents with pulmonary circulation congestion, typical symptoms are varying degrees of dyspnea.'
    }
  },
  {
    id: 72,
    disease: { zh: '心房颤动', en: 'Atrial Fibrillation' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '心房颤动最危险的并发症是什么？',
      en: 'What is the most dangerous complication of atrial fibrillation?'
    },
    options: {
      zh: ['血栓形成导致脑卒中', '心力衰竭', '心肌梗死', '肾功能衰竭'],
      en: ['Thrombus formation leading to stroke', 'Heart failure', 'Myocardial infarction', 'Renal failure']
    },
    correctAnswer: 0,
    explanation: {
      zh: '房颤时心房失去有效收缩，血液淤滞易形成血栓，血栓脱落可导致脑卒中。',
      en: 'During AF, the atria lose effective contraction, blood stasis promotes thrombus formation, which can embolize and cause stroke.'
    }
  },
  {
    id: 73,
    disease: { zh: '慢性心力衰竭', en: 'Chronic Heart Failure' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '心力衰竭治疗的"金三角"药物是什么？',
      en: 'What are the "golden triangle" drugs for heart failure treatment?'
    },
    options: {
      zh: ['ACEI/ARB、β受体阻滞剂、醛固酮拮抗剂', '利尿剂、强心苷、血管扩张剂', '钙通道阻滞剂、硝酸酯类、抗凝药', '他汀类、阿司匹林、氯吡格雷'],
      en: ['ACEI/ARB, beta-blockers, aldosterone antagonists', 'Diuretics, cardiac glycosides, vasodilators', 'Calcium channel blockers, nitrates, anticoagulants', 'Statins, aspirin, clopidogrel']
    },
    correctAnswer: 0,
    explanation: {
      zh: '慢性心衰治疗的"金三角"：ACEI/ARB、β受体阻滞剂、醛固酮拮抗剂，可改善预后。',
      en: 'The "golden triangle" for chronic HF: ACEI/ARB, beta-blockers, aldosterone antagonists, which improve prognosis.'
    }
  },
  {
    id: 74,
    disease: { zh: '胃溃疡', en: 'Gastric Ulcer' },
    treatmentDays: 60,
    category: 'serious',
    question: {
      zh: '胃溃疡疼痛的典型规律是什么？',
      en: 'What is the typical pattern of gastric ulcer pain?'
    },
    options: {
      zh: ['餐后痛，进食-疼痛-缓解', '空腹痛，疼痛-进食-缓解', '夜间痛', '持续性疼痛'],
      en: ['Postprandial pain, eating-pain-relief', 'Hunger pain, pain-eating-relief', 'Night pain', 'Persistent pain']
    },
    correctAnswer: 0,
    explanation: {
      zh: '胃溃疡典型疼痛规律：进食后疼痛，持续1-2小时后缓解，即进食-疼痛-缓解。',
      en: 'Typical gastric ulcer pain: postprandial pain, lasting 1-2 hours then relief, i.e., eating-pain-relief.'
    }
  },
  {
    id: 75,
    disease: { zh: '十二指肠溃疡', en: 'Duodenal Ulcer' },
    treatmentDays: 60,
    category: 'serious',
    question: {
      zh: '十二指肠溃疡疼痛的典型规律是什么？',
      en: 'What is the typical pattern of duodenal ulcer pain?'
    },
    options: {
      zh: ['空腹痛，疼痛-进食-缓解', '餐后痛，进食-疼痛-缓解', '持续性疼痛', '无规律疼痛'],
      en: ['Hunger pain, pain-eating-relief', 'Postprandial pain, eating-pain-relief', 'Persistent pain', 'Irregular pain']
    },
    correctAnswer: 0,
    explanation: {
      zh: '十二指肠溃疡典型疼痛规律：空腹时疼痛，进食后缓解，即疼痛-进食-缓解。',
      en: 'Typical duodenal ulcer pain: hunger pain, relieved by eating, i.e., pain-eating-relief.'
    }
  },
  {
    id: 76,
    disease: { zh: '炎症性肠病', en: 'Inflammatory Bowel Disease' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '克罗恩病和溃疡性结肠炎的主要区别是什么？',
      en: 'What is the main difference between Crohn\'s disease and ulcerative colitis?'
    },
    options: {
      zh: ['克罗恩病可累及全消化道，溃疡性结肠炎仅限结肠', '两者没有区别', '溃疡性结肠炎更严重', '克罗恩病只影响小肠'],
      en: ['Crohn\'s can affect entire GI tract, UC only colon', 'No difference', 'UC is more severe', 'Crohn\'s only affects small intestine']
    },
    correctAnswer: 0,
    explanation: {
      zh: '克罗恩病可累及从口腔到肛门的任何部位，溃疡性结肠炎仅限结肠和直肠。',
      en: 'Crohn\'s can affect any part from mouth to anus, UC is limited to colon and rectum.'
    }
  },
  {
    id: 77,
    disease: { zh: '慢性胰腺炎', en: 'Chronic Pancreatitis' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '慢性胰腺炎最常见的病因是什么？',
      en: 'What is the most common cause of chronic pancreatitis?'
    },
    options: {
      zh: ['长期酗酒', '胆道疾病', '高脂血症', '遗传因素'],
      en: ['Long-term alcoholism', 'Biliary disease', 'Hyperlipidemia', 'Genetic factors']
    },
    correctAnswer: 0,
    explanation: {
      zh: '长期酗酒是慢性胰腺炎最常见的病因，占70-80%。',
      en: 'Long-term alcoholism is the most common cause of chronic pancreatitis, accounting for 70-80%.'
    }
  },
  {
    id: 78,
    disease: { zh: '胆囊炎', en: 'Cholecystitis' },
    treatmentDays: 30,
    category: 'serious',
    question: {
      zh: '急性胆囊炎最常见的病因是什么？',
      en: 'What is the most common cause of acute cholecystitis?'
    },
    options: {
      zh: ['胆囊结石嵌顿', '细菌感染', '病毒感染', '肿瘤'],
      en: ['Gallstone impaction', 'Bacterial infection', 'Viral infection', 'Tumor']
    },
    correctAnswer: 0,
    explanation: {
      zh: '90%以上的急性胆囊炎由胆囊结石引起，结石嵌顿在胆囊管导致梗阻和炎症。',
      en: 'Over 90% of acute cholecystitis is caused by gallstones, with stone impaction in cystic duct causing obstruction and inflammation.'
    }
  },
  {
    id: 79,
    disease: { zh: '肾结石', en: 'Kidney Stones' },
    treatmentDays: 30,
    category: 'serious',
    question: {
      zh: '肾结石最常见的成分是什么？',
      en: 'What is the most common composition of kidney stones?'
    },
    options: {
      zh: ['草酸钙', '尿酸', '磷酸铵镁', '胱氨酸'],
      en: ['Calcium oxalate', 'Uric acid', 'Struvite', 'Cystine']
    },
    correctAnswer: 0,
    explanation: {
      zh: '草酸钙结石最常见，占肾结石的70-80%。',
      en: 'Calcium oxalate stones are most common, accounting for 70-80% of kidney stones.'
    }
  },
  {
    id: 80,
    disease: { zh: '前列腺增生', en: 'Benign Prostatic Hyperplasia' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '良性前列腺增生最常见的症状是什么？',
      en: 'What is the most common symptom of BPH?'
    },
    options: {
      zh: ['下尿路症状（尿频、尿急、排尿困难）', '血尿', '腰痛', '发热'],
      en: ['Lower urinary tract symptoms (frequency, urgency, difficulty)', 'Hematuria', 'Back pain', 'Fever']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'BPH主要表现为下尿路症状，包括储尿期症状（尿频、尿急）和排尿期症状（排尿困难）。',
      en: 'BPH mainly presents with lower urinary tract symptoms, including storage (frequency, urgency) and voiding (difficulty) symptoms.'
    }
  },
  {
    id: 81,
    disease: { zh: '子宫内膜异位症', en: 'Endometriosis' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '子宫内膜异位症最典型的症状是什么？',
      en: 'What is the most typical symptom of endometriosis?'
    },
    options: {
      zh: ['继发性痛经，进行性加重', '月经不规律', '不孕', '性交疼痛'],
      en: ['Secondary dysmenorrhea, progressively worsening', 'Irregular menstruation', 'Infertility', 'Dyspareunia']
    },
    correctAnswer: 0,
    explanation: {
      zh: '子宫内膜异位症典型症状是继发性痛经，进行性加重，常在月经前1-2天开始。',
      en: 'Typical symptom of endometriosis is secondary dysmenorrhea, progressively worsening, often starting 1-2 days before menstruation.'
    }
  },
  {
    id: 82,
    disease: { zh: '多囊卵巢综合征', en: 'Polycystic Ovary Syndrome' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: 'PCOS的三大主要特征是什么？',
      en: 'What are the three main features of PCOS?'
    },
    options: {
      zh: ['排卵障碍、高雄激素血症、多囊卵巢', '月经不规律、肥胖、不孕', '痤疮、多毛、脱发', '胰岛素抵抗、糖尿病、高血压'],
      en: ['Ovulatory dysfunction, hyperandrogenism, polycystic ovaries', 'Irregular menstruation, obesity, infertility', 'Acne, hirsutism, hair loss', 'Insulin resistance, diabetes, hypertension']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'PCOS诊断标准（鹿特丹标准）：排卵障碍、临床或生化高雄激素、卵巢多囊样改变。',
      en: 'PCOS diagnostic criteria (Rotterdam): ovulatory dysfunction, clinical/biochemical hyperandrogenism, polycystic ovarian morphology.'
    }
  },
  {
    id: 83,
    disease: { zh: '青光眼', en: 'Glaucoma' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '青光眼最主要的危险因素是什么？',
      en: 'What is the most important risk factor for glaucoma?'
    },
    options: {
      zh: ['眼压升高', '年龄增长', '遗传因素', '糖尿病'],
      en: ['Elevated intraocular pressure', 'Aging', 'Genetic factors', 'Diabetes']
    },
    correctAnswer: 0,
    explanation: {
      zh: '眼压升高是青光眼最重要的危险因素，可导致视神经损伤和视野缺损。',
      en: 'Elevated IOP is the most important risk factor for glaucoma, which can cause optic nerve damage and visual field defects.'
    }
  },
  {
    id: 84,
    disease: { zh: '白内障', en: 'Cataract' },
    treatmentDays: 30,
    category: 'serious',
    question: {
      zh: '老年性白内障最常见的类型是什么？',
      en: 'What is the most common type of age-related cataract?'
    },
    options: {
      zh: ['皮质性白内障', '核性白内障', '后囊下白内障', '先天性白内障'],
      en: ['Cortical cataract', 'Nuclear cataract', 'Posterior subcapsular cataract', 'Congenital cataract']
    },
    correctAnswer: 0,
    explanation: {
      zh: '皮质性白内障是老年性白内障最常见的类型，从周边皮质开始混浊。',
      en: 'Cortical cataract is the most common type of age-related cataract, starting with peripheral cortical opacity.'
    }
  },
  {
    id: 85,
    disease: { zh: '银屑病', en: 'Psoriasis' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '寻常型银屑病最典型的皮损表现是什么？',
      en: 'What is the most typical skin lesion of psoriasis vulgaris?'
    },
    options: {
      zh: ['红色斑块覆有银白色鳞屑', '水疱', '糜烂', '萎缩'],
      en: ['Red plaques with silvery scales', 'Blisters', 'Erosion', 'Atrophy']
    },
    correctAnswer: 0,
    explanation: {
      zh: '寻常型银屑病典型表现为境界清楚的红色斑块，表面覆盖银白色鳞屑。',
      en: 'Typical psoriasis vulgaris presents with well-demarcated red plaques covered with silvery scales.'
    }
  },
  {
    id: 86,
    disease: { zh: '白癜风', en: 'Vitiligo' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '白癜风的病因是什么？',
      en: 'What is the cause of vitiligo?'
    },
    options: {
      zh: ['黑素细胞破坏', '真菌感染', '细菌感染', '病毒感染'],
      en: ['Melanocyte destruction', 'Fungal infection', 'Bacterial infection', 'Viral infection']
    },
    correctAnswer: 0,
    explanation: {
      zh: '白癜风是由于黑素细胞被破坏或功能丧失，导致皮肤出现白斑。',
      en: 'Vitiligo is caused by destruction or loss of function of melanocytes, leading to white patches on skin.'
    }
  },
  {
    id: 87,
    disease: { zh: '系统性硬化症', en: 'Systemic Sclerosis' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '系统性硬化症的特征性表现是什么？',
      en: 'What is the characteristic manifestation of systemic sclerosis?'
    },
    options: {
      zh: ['皮肤硬化和内脏纤维化', '关节畸形', '肌肉萎缩', '神经损伤'],
      en: ['Skin hardening and internal organ fibrosis', 'Joint deformity', 'Muscle atrophy', 'Nerve damage']
    },
    correctAnswer: 0,
    explanation: {
      zh: '系统性硬化症特征是皮肤和内脏器官的纤维化，可导致皮肤变硬、肺纤维化等。',
      en: 'Systemic sclerosis is characterized by fibrosis of skin and internal organs, causing skin hardening, pulmonary fibrosis, etc.'
    }
  },
  {
    id: 88,
    disease: { zh: '强直性脊柱炎', en: 'Ankylosing Spondylitis' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '强直性脊柱炎最典型的症状是什么？',
      en: 'What is the most typical symptom of ankylosing spondylitis?'
    },
    options: {
      zh: ['炎性腰背痛，晨僵，活动后改善', '关节红肿', '肌肉无力', '皮肤红斑'],
      en: ['Inflammatory back pain, morning stiffness, improves with activity', 'Joint redness and swelling', 'Muscle weakness', 'Skin redness']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'AS典型症状是炎性腰背痛，特点是休息后加重，活动后改善，晨僵明显。',
      en: 'Typical AS symptom is inflammatory back pain, characterized by worsening with rest, improvement with activity, and significant morning stiffness.'
    }
  },
  {
    id: 89,
    disease: { zh: '重症肌无力', en: 'Myasthenia Gravis' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '重症肌无力的特征性表现是什么？',
      en: 'What is the characteristic manifestation of myasthenia gravis?'
    },
    options: {
      zh: ['波动性肌无力，活动后加重，休息后改善', '持续性肌无力', '肌肉萎缩', '肌肉疼痛'],
      en: ['Fluctuating muscle weakness, worsens with activity, improves with rest', 'Persistent muscle weakness', 'Muscle atrophy', 'Muscle pain']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'MG特征是波动性肌无力，晨轻暮重，活动后加重，休息后改善。',
      en: 'MG is characterized by fluctuating muscle weakness, better in morning, worse in evening, worsens with activity, improves with rest.'
    }
  },
  {
    id: 90,
    disease: { zh: '多发性硬化', en: 'Multiple Sclerosis' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '多发性硬化的病理特征是什么？',
      en: 'What is the pathological feature of multiple sclerosis?'
    },
    options: {
      zh: ['中枢神经系统脱髓鞘', '周围神经损伤', '神经元死亡', '脑萎缩'],
      en: ['Central nervous system demyelination', 'Peripheral nerve damage', 'Neuron death', 'Brain atrophy']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'MS病理特征是中枢神经系统白质脱髓鞘，形成多发硬化斑块。',
      en: 'MS pathological feature is demyelination of CNS white matter, forming multiple sclerotic plaques.'
    }
  },
  {
    id: 91,
    disease: { zh: '癫痫', en: 'Epilepsy' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '癫痫大发作（全面强直-阵挛发作）的典型表现是什么？',
      en: 'What is the typical presentation of a grand mal seizure?'
    },
    options: {
      zh: ['意识丧失、全身强直、阵挛', '短暂失神', '局部抽搐', '感觉异常'],
      en: ['Loss of consciousness,全身 tonic, clonic', 'Brief absence', 'Focal twitching', 'Sensory abnormality']
    },
    correctAnswer: 0,
    explanation: {
      zh: '大发作典型表现为突然意识丧失、全身强直、随后阵挛，常伴舌咬伤和尿失禁。',
      en: 'Grand mal typically presents with sudden LOC,全身 tonic phase, then clonic phase, often with tongue biting and incontinence.'
    }
  },
  {
    id: 92,
    disease: { zh: '慢性阻塞性肺疾病急性加重', en: 'AECOPD' },
    treatmentDays: 14,
    category: 'serious',
    question: {
      zh: 'COPD急性加重最常见的诱因是什么？',
      en: 'What is the most common trigger for AECOPD?'
    },
    options: {
      zh: ['呼吸道感染', '空气污染', '心力衰竭', '肺栓塞'],
      en: ['Respiratory infection', 'Air pollution', 'Heart failure', 'Pulmonary embolism']
    },
    correctAnswer: 0,
    explanation: {
      zh: '呼吸道感染（病毒或细菌）是COPD急性加重最常见的诱因。',
      en: 'Respiratory infection (viral or bacterial) is the most common trigger for AECOPD.'
    }
  },
  {
    id: 93,
    disease: { zh: '肺栓塞', en: 'Pulmonary Embolism' },
    treatmentDays: 180,
    category: 'serious',
    question: {
      zh: '肺栓塞最常见的来源是什么？',
      en: 'What is the most common source of pulmonary embolism?'
    },
    options: {
      zh: ['下肢深静脉血栓', '右心房血栓', '脂肪栓子', '羊水栓子'],
      en: ['Deep vein thrombosis of lower extremities', 'Right atrial thrombus', 'Fat embolism', 'Amniotic fluid embolism']
    },
    correctAnswer: 0,
    explanation: {
      zh: '大多数肺栓塞来源于下肢深静脉血栓，血栓脱落后随血流进入肺动脉。',
      en: 'Most PE originates from DVT of lower extremities, thrombus embolizes and travels to pulmonary arteries.'
    }
  },
  {
    id: 94,
    disease: { zh: '主动脉夹层', en: 'Aortic Dissection' },
    treatmentDays: 180,
    category: 'serious',
    question: {
      zh: '主动脉夹层最典型的症状是什么？',
      en: 'What is the most typical symptom of aortic dissection?'
    },
    options: {
      zh: ['突发剧烈胸痛，呈撕裂样', '持续钝痛', '渐进性疼痛', '无痛'],
      en: ['Sudden severe chest pain, tearing in nature', 'Persistent dull pain', 'Progressive pain', 'Painless']
    },
    correctAnswer: 0,
    explanation: {
      zh: '主动脉夹层典型表现为突发剧烈胸痛，呈撕裂样或刀割样，疼痛从一开始即达高峰。',
      en: 'Typical aortic dissection presentation is sudden severe chest pain, tearing or stabbing, reaching peak intensity at onset.'
    }
  },
  {
    id: 95,
    disease: { zh: '感染性心内膜炎', en: 'Infective Endocarditis' },
    treatmentDays: 60,
    category: 'serious',
    question: {
      zh: '感染性心内膜炎最常见的病原体是什么？',
      en: 'What is the most common pathogen in infective endocarditis?'
    },
    options: {
      zh: ['链球菌', '葡萄球菌', '肠球菌', '真菌'],
      en: ['Streptococcus', 'Staphylococcus', 'Enterococcus', 'Fungi']
    },
    correctAnswer: 0,
    explanation: {
      zh: '链球菌（尤其是草绿色链球菌）是自体瓣膜心内膜炎最常见的病原体。',
      en: 'Streptococcus (especially viridans streptococci) is the most common pathogen in native valve endocarditis.'
    }
  },
  {
    id: 96,
    disease: { zh: '心肌炎', en: 'Myocarditis' },
    treatmentDays: 90,
    category: 'serious',
    question: {
      zh: '病毒性心肌炎最常见的病原体是什么？',
      en: 'What is the most common pathogen in viral myocarditis?'
    },
    options: {
      zh: ['柯萨奇病毒B组', '腺病毒', '流感病毒', 'EB病毒'],
      en: ['Coxsackievirus B', 'Adenovirus', 'Influenza virus', 'Epstein-Barr virus']
    },
    correctAnswer: 0,
    explanation: {
      zh: '柯萨奇病毒B组是病毒性心肌炎最常见的病原体。',
      en: 'Coxsackievirus B is the most common pathogen in viral myocarditis.'
    }
  },
  {
    id: 97,
    disease: { zh: '心包炎', en: 'Pericarditis' },
    treatmentDays: 30,
    category: 'serious',
    question: {
      zh: '急性心包炎最典型的症状是什么？',
      en: 'What is the most typical symptom of acute pericarditis?'
    },
    options: {
      zh: ['胸痛，前倾坐位时减轻', '持续性胸痛', '呼吸困难', '心悸'],
      en: ['Chest pain, relieved by leaning forward', 'Persistent chest pain', 'Dyspnea', 'Palpitations']
    },
    correctAnswer: 0,
    explanation: {
      zh: '急性心包炎典型胸痛特点是平卧时加重，前倾坐位时减轻。',
      en: 'Typical chest pain in acute pericarditis worsens when supine and improves when leaning forward.'
    }
  },
  {
    id: 98,
    disease: { zh: '再生障碍性贫血', en: 'Aplastic Anemia' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '再生障碍性贫血的主要特征是什么？',
      en: 'What is the main feature of aplastic anemia?'
    },
    options: {
      zh: ['全血细胞减少和骨髓增生低下', '白细胞增多', '血小板增多', '红细胞增多'],
      en: ['Pancytopenia and hypocellular bone marrow', 'Leukocytosis', 'Thrombocytosis', 'Polycythemia']
    },
    correctAnswer: 0,
    explanation: {
      zh: '再障特征是骨髓造血功能衰竭，表现为全血细胞减少和骨髓增生低下。',
      en: 'AA is characterized by bone marrow failure, presenting with pancytopenia and hypocellular bone marrow.'
    }
  },
  {
    id: 99,
    disease: { zh: '特发性血小板减少性紫癜', en: 'ITP' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: 'ITP的发病机制是什么？',
      en: 'What is the pathogenesis of ITP?'
    },
    options: {
      zh: ['自身免疫导致血小板破坏增多', '骨髓生成减少', '脾功能亢进', '消耗性凝血'],
      en: ['Autoimmune destruction of platelets', 'Decreased bone marrow production', 'Hypersplenism', 'Consumptive coagulopathy']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'ITP是自身免疫性疾病，机体产生抗血小板抗体，导致血小板破坏增多。',
      en: 'ITP is an autoimmune disease where the body produces anti-platelet antibodies, leading to increased platelet destruction.'
    }
  },
  {
    id: 100,
    disease: { zh: '血友病', en: 'Hemophilia' },
    treatmentDays: 365,
    category: 'serious',
    question: {
      zh: '血友病A缺乏的凝血因子是什么？',
      en: 'Which clotting factor is deficient in Hemophilia A?'
    },
    options: {
      zh: ['因子VIII', '因子IX', '因子XI', '因子X'],
      en: ['Factor VIII', 'Factor IX', 'Factor XI', 'Factor X']
    },
    correctAnswer: 0,
    explanation: {
      zh: '血友病A是因子VIII缺乏，血友病B是因子IX缺乏，均为X连锁隐性遗传。',
      en: 'Hemophilia A is factor VIII deficiency, Hemophilia B is factor IX deficiency, both X-linked recessive.'
    }
  },
  {
    id: 101,
    disease: { zh: '急性白血病', en: 'Acute Leukemia' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '急性白血病最常见的首发症状是什么？',
      en: 'What is the most common initial symptom of acute leukemia?'
    },
    options: {
      zh: ['贫血、出血、感染', '骨痛', '肝脾肿大', '淋巴结肿大'],
      en: ['Anemia, bleeding, infection', 'Bone pain', 'Hepatosplenomegaly', 'Lymphadenopathy']
    },
    correctAnswer: 0,
    explanation: {
      zh: '急性白血病常见首发症状：贫血（乏力、苍白）、出血（皮肤瘀点、鼻出血）、感染（发热）。',
      en: 'Common initial symptoms of acute leukemia: anemia (fatigue, pallor), bleeding (petechiae, epistaxis), infection (fever).'
    }
  },
  {
    id: 102,
    disease: { zh: '慢性粒细胞白血病', en: 'Chronic Myeloid Leukemia' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: 'CML的特征性遗传学异常是什么？',
      en: 'What is the characteristic genetic abnormality in CML?'
    },
    options: {
      zh: ['Ph染色体（t(9;22)）', 't(15;17)', 't(8;21)', 'inv(16)'],
      en: ['Philadelphia chromosome (t(9;22))', 't(15;17)', 't(8;21)', 'inv(16)']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'CML特征是Ph染色体，即t(9;22)易位，形成BCR-ABL融合基因。',
      en: 'CML is characterized by Philadelphia chromosome, t(9;22) translocation, forming BCR-ABL fusion gene.'
    }
  },
  {
    id: 103,
    disease: { zh: '急性淋巴细胞白血病', en: 'Acute Lymphoblastic Leukemia' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: 'ALL最常见的发病年龄是？',
      en: 'What is the most common age of onset for ALL?'
    },
    options: {
      zh: ['儿童（3-7岁）', '青少年', '中年人', '老年人'],
      en: ['Children (3-7 years)', 'Adolescents', 'Middle-aged', 'Elderly']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'ALL是儿童最常见的恶性肿瘤，发病高峰在3-7岁。',
      en: 'ALL is the most common malignancy in children, with peak incidence at 3-7 years.'
    }
  },
  {
    id: 104,
    disease: { zh: '霍奇金淋巴瘤', en: 'Hodgkin Lymphoma' },
    treatmentDays: 180,
    category: 'critical',
    question: {
      zh: '霍奇金淋巴瘤的特征性细胞是什么？',
      en: 'What is the characteristic cell in Hodgkin lymphoma?'
    },
    options: {
      zh: ['R-S细胞（Reed-Sternberg细胞）', 'T细胞', 'B细胞', 'NK细胞'],
      en: ['R-S cells (Reed-Sternberg cells)', 'T cells', 'B cells', 'NK cells']
    },
    correctAnswer: 0,
    explanation: {
      zh: '霍奇金淋巴瘤的特征是存在R-S细胞，这是一种大的双核或多核巨细胞。',
      en: 'Hodgkin lymphoma is characterized by Reed-Sternberg cells, large binucleated or multinucleated giant cells.'
    }
  },
  {
    id: 105,
    disease: { zh: '非霍奇金淋巴瘤', en: 'Non-Hodgkin Lymphoma' },
    treatmentDays: 180,
    category: 'critical',
    question: {
      zh: 'NHL最常见的病理类型是什么？',
      en: 'What is the most common pathological type of NHL?'
    },
    options: {
      zh: ['弥漫大B细胞淋巴瘤', '滤泡性淋巴瘤', '套细胞淋巴瘤', '外周T细胞淋巴瘤'],
      en: ['Diffuse large B-cell lymphoma', 'Follicular lymphoma', 'Mantle cell lymphoma', 'Peripheral T-cell lymphoma']
    },
    correctAnswer: 0,
    explanation: {
      zh: '弥漫大B细胞淋巴瘤（DLBCL）是NHL最常见的类型，约占30-40%。',
      en: 'Diffuse large B-cell lymphoma (DLBCL) is the most common type of NHL, accounting for about 30-40%.'
    }
  },
  {
    id: 106,
    disease: { zh: '多发性骨髓瘤', en: 'Multiple Myeloma' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '多发性骨髓瘤的CRAB症状包括什么？',
      en: 'What do the CRAB symptoms of multiple myeloma include?'
    },
    options: {
      zh: ['高钙血症、肾功能不全、贫血、骨病', '咳嗽、心悸、腹痛、背痛', '发热、盗汗、体重减轻、乏力', '头痛、呕吐、视力模糊、抽搐'],
      en: ['Hypercalcemia, renal insufficiency, anemia, bone disease', 'Cough, palpitations, abdominal pain, back pain', 'Fever, night sweats, weight loss, fatigue', 'Headache, vomiting, blurred vision, seizures']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'MM的CRAB症状：高钙血症（C）、肾功能不全（R）、贫血（A）、骨病（B）。',
      en: 'MM CRAB symptoms: hyperCalcemia, Renal insufficiency, Anemia, Bone disease.'
    }
  },
  {
    id: 107,
    disease: { zh: '肺癌', en: 'Lung Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '肺癌最常见的病理类型是什么？',
      en: 'What is the most common pathological type of lung cancer?'
    },
    options: {
      zh: ['非小细胞肺癌（腺癌）', '小细胞肺癌', '鳞状细胞癌', '大细胞癌'],
      en: ['Non-small cell lung cancer (adenocarcinoma)', 'Small cell lung cancer', 'Squamous cell carcinoma', 'Large cell carcinoma']
    },
    correctAnswer: 0,
    explanation: {
      zh: '非小细胞肺癌占肺癌的80-85%，其中腺癌是最常见的亚型。',
      en: 'NSCLC accounts for 80-85% of lung cancers, with adenocarcinoma being the most common subtype.'
    }
  },
  {
    id: 108,
    disease: { zh: '乳腺癌', en: 'Breast Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '乳腺癌最常见的首发症状是什么？',
      en: 'What is the most common initial symptom of breast cancer?'
    },
    options: {
      zh: ['无痛性乳房肿块', '乳房疼痛', '乳头溢液', '皮肤凹陷'],
      en: ['Painless breast mass', 'Breast pain', 'Nipple discharge', 'Skin dimpling']
    },
    correctAnswer: 0,
    explanation: {
      zh: '乳腺癌最常见首发症状是无痛性、单发、质硬、边界不清的乳房肿块。',
      en: 'Most common initial symptom of breast cancer is a painless, solitary, hard, ill-defined breast mass.'
    }
  },
  {
    id: 109,
    disease: { zh: '结直肠癌', en: 'Colorectal Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '结直肠癌最常见的转移部位是什么？',
      en: 'What is the most common site of metastasis for colorectal cancer?'
    },
    options: {
      zh: ['肝脏', '肺', '骨', '脑'],
      en: ['Liver', 'Lung', 'Bone', 'Brain']
    },
    correctAnswer: 0,
    explanation: {
      zh: '结直肠癌最常见的转移部位是肝脏，因为门静脉系统将血液从肠道引流至肝脏。',
      en: 'The most common metastatic site for colorectal cancer is the liver, as the portal venous system drains blood from the intestines to the liver.'
    }
  },
  {
    id: 110,
    disease: { zh: '胃癌', en: 'Gastric Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '胃癌最重要的危险因素是什么？',
      en: 'What is the most important risk factor for gastric cancer?'
    },
    options: {
      zh: ['幽门螺杆菌感染', '高盐饮食', '吸烟', '遗传因素'],
      en: ['Helicobacter pylori infection', 'High-salt diet', 'Smoking', 'Genetic factors']
    },
    correctAnswer: 0,
    explanation: {
      zh: '幽门螺杆菌感染是胃癌最重要的危险因素，被WHO列为一类致癌物。',
      en: 'H. pylori infection is the most important risk factor for gastric cancer, classified as a Group 1 carcinogen by WHO.'
    }
  },
  {
    id: 111,
    disease: { zh: '肝癌', en: 'Liver Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '肝细胞癌最常见的病因是什么？',
      en: 'What is the most common cause of hepatocellular carcinoma?'
    },
    options: {
      zh: ['慢性乙型肝炎和肝硬化', '酒精性肝病', '脂肪肝', '药物性肝损伤'],
      en: ['Chronic hepatitis B and cirrhosis', 'Alcoholic liver disease', 'Fatty liver', 'Drug-induced liver injury']
    },
    correctAnswer: 0,
    explanation: {
      zh: '在中国，慢性乙型肝炎和肝硬化是肝细胞癌最主要的病因。',
      en: 'In China, chronic hepatitis B and cirrhosis are the main causes of hepatocellular carcinoma.'
    }
  },
  {
    id: 112,
    disease: { zh: '食管癌', en: 'Esophageal Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '食管癌最典型的症状是什么？',
      en: 'What is the most typical symptom of esophageal cancer?'
    },
    options: {
      zh: ['进行性吞咽困难', '胸痛', '反酸', '呕吐'],
      en: ['Progressive dysphagia', 'Chest pain', 'Acid reflux', 'Vomiting']
    },
    correctAnswer: 0,
    explanation: {
      zh: '食管癌典型症状是进行性吞咽困难，先难咽固体食物，后发展至流质。',
      en: 'Typical symptom of esophageal cancer is progressive dysphagia, initially with solids, then progressing to liquids.'
    }
  },
  {
    id: 113,
    disease: { zh: '胰腺癌', en: 'Pancreatic Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '胰腺癌最常见的部位是？',
      en: 'What is the most common site of pancreatic cancer?'
    },
    options: {
      zh: ['胰头', '胰体', '胰尾', '全胰腺'],
      en: ['Pancreatic head', 'Pancreatic body', 'Pancreatic tail', 'Entire pancreas']
    },
    correctAnswer: 0,
    explanation: {
      zh: '约70%的胰腺癌发生在胰头，可引起梗阻性黄疸。',
      en: 'About 70% of pancreatic cancers occur in the pancreatic head, which can cause obstructive jaundice.'
    }
  },
  {
    id: 114,
    disease: { zh: '肾癌', en: 'Kidney Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '肾癌的经典三联征是什么？',
      en: 'What is the classic triad of kidney cancer?'
    },
    options: {
      zh: ['血尿、腰痛、腹部肿块', '发热、高血压、贫血', '体重减轻、乏力、食欲减退', '水肿、蛋白尿、高血压'],
      en: ['Hematuria, flank pain, abdominal mass', 'Fever, hypertension, anemia', 'Weight loss, fatigue, anorexia', 'Edema, proteinuria, hypertension']
    },
    correctAnswer: 0,
    explanation: {
      zh: '肾癌经典三联征：血尿、腰痛、腹部肿块，但仅10%患者同时出现。',
      en: 'Classic triad of renal cell carcinoma: hematuria, flank pain, abdominal mass, but only 10% present with all three.'
    }
  },
  {
    id: 115,
    disease: { zh: '膀胱癌', en: 'Bladder Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '膀胱癌最常见的首发症状是什么？',
      en: 'What is the most common initial symptom of bladder cancer?'
    },
    options: {
      zh: ['无痛性肉眼血尿', '尿频尿急', '排尿困难', '下腹痛'],
      en: ['Painless gross hematuria', 'Frequency and urgency', 'Dysuria', 'Lower abdominal pain']
    },
    correctAnswer: 0,
    explanation: {
      zh: '膀胱癌最常见首发症状是无痛性肉眼血尿，间歇性发作。',
      en: 'Most common initial symptom of bladder cancer is painless gross hematuria, intermittent.'
    }
  },
  {
    id: 116,
    disease: { zh: '前列腺癌', en: 'Prostate Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '前列腺癌最常用的筛查指标是什么？',
      en: 'What is the most commonly used screening marker for prostate cancer?'
    },
    options: {
      zh: ['PSA（前列腺特异性抗原）', 'CEA', 'AFP', 'CA125'],
      en: ['PSA (Prostate-Specific Antigen)', 'CEA', 'AFP', 'CA125']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'PSA是前列腺癌最常用的筛查指标，但特异性有限，需结合其他检查。',
      en: 'PSA is the most commonly used screening marker for prostate cancer, but has limited specificity and needs to be combined with other tests.'
    }
  },
  {
    id: 117,
    disease: { zh: '宫颈癌', en: 'Cervical Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '宫颈癌最主要的病因是什么？',
      en: 'What is the main cause of cervical cancer?'
    },
    options: {
      zh: ['高危型HPV持续感染', '单纯疱疹病毒感染', '衣原体感染', '遗传因素'],
      en: ['Persistent high-risk HPV infection', 'Herpes simplex virus infection', 'Chlamydia infection', 'Genetic factors']
    },
    correctAnswer: 0,
    explanation: {
      zh: '高危型HPV（16、18型等）持续感染是宫颈癌最主要的病因。',
      en: 'Persistent high-risk HPV (16, 18, etc.) infection is the main cause of cervical cancer.'
    }
  },
  {
    id: 118,
    disease: { zh: '卵巢癌', en: 'Ovarian Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '卵巢癌最常用的肿瘤标志物是什么？',
      en: 'What is the most commonly used tumor marker for ovarian cancer?'
    },
    options: {
      zh: ['CA125', 'CEA', 'AFP', 'CA19-9'],
      en: ['CA125', 'CEA', 'AFP', 'CA19-9']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'CA125是卵巢癌最常用的肿瘤标志物，尤其对浆液性癌敏感。',
      en: 'CA125 is the most commonly used tumor marker for ovarian cancer, especially sensitive for serous carcinoma.'
    }
  },
  {
    id: 119,
    disease: { zh: '甲状腺癌', en: 'Thyroid Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '甲状腺癌最常见的病理类型是什么？',
      en: 'What is the most common pathological type of thyroid cancer?'
    },
    options: {
      zh: ['乳头状癌', '滤泡状癌', '髓样癌', '未分化癌'],
      en: ['Papillary carcinoma', 'Follicular carcinoma', 'Medullary carcinoma', 'Anaplastic carcinoma']
    },
    correctAnswer: 0,
    explanation: {
      zh: '乳头状癌是最常见的甲状腺癌类型，占80-90%，预后最好。',
      en: 'Papillary carcinoma is the most common type of thyroid cancer, accounting for 80-90%, with the best prognosis.'
    }
  },
  {
    id: 120,
    disease: { zh: '骨肉瘤', en: 'Osteosarcoma' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '骨肉瘤最常见的发病部位是？',
      en: 'What is the most common site of osteosarcoma?'
    },
    options: {
      zh: ['股骨远端和胫骨近端', '肱骨近端', '骨盆', '脊柱'],
      en: ['Distal femur and proximal tibia', 'Proximal humerus', 'Pelvis', 'Spine']
    },
    correctAnswer: 0,
    explanation: {
      zh: '骨肉瘤最常见于长骨干骺端，尤其是股骨远端和胫骨近端（膝关节周围）。',
      en: 'Osteosarcoma most commonly occurs in the metaphysis of long bones, especially distal femur and proximal tibia (around the knee).'
    }
  },
  {
    id: 121,
    disease: { zh: '软组织肉瘤', en: 'Soft Tissue Sarcoma' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '软组织肉瘤最常见的转移途径是什么？',
      en: 'What is the most common route of metastasis for soft tissue sarcoma?'
    },
    options: {
      zh: ['血行转移（肺转移）', '淋巴转移', '种植转移', '直接浸润'],
      en: ['Hematogenous metastasis (lung)', 'Lymphatic metastasis', 'Seeding metastasis', 'Direct invasion']
    },
    correctAnswer: 0,
    explanation: {
      zh: '软组织肉瘤主要通过血行转移，肺是最常见的转移部位。',
      en: 'Soft tissue sarcomas mainly metastasize via blood, with the lung being the most common site.'
    }
  },
  {
    id: 122,
    disease: { zh: '黑色素瘤', en: 'Melanoma' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '恶性黑色素瘤的ABCDE特征包括什么？',
      en: 'What do the ABCDE features of malignant melanoma include?'
    },
    options: {
      zh: ['不对称、边界不规则、颜色不均、直径>6mm、进展', '痤疮、疤痕、色素沉着、脱发、瘙痒', '红斑、水疱、糜烂、结痂、脱屑', '疼痛、肿胀、发热、发红、功能障碍'],
      en: ['Asymmetry, Border irregularity, Color variation, Diameter >6mm, Evolution', 'Acne, scar, pigmentation, hair loss, itching', 'Erythema, blister, erosion, crusting, scaling', 'Pain, swelling, heat, redness, dysfunction']
    },
    correctAnswer: 0,
    explanation: {
      zh: '黑色素瘤ABCDE特征：Asymmetry（不对称）、Border irregularity（边界不规则）、Color variation（颜色不均）、Diameter >6mm（直径>6mm）、Evolution（进展变化）。',
      en: 'Melanoma ABCDE: Asymmetry, Border irregularity, Color variation, Diameter >6mm, Evolution.'
    }
  },
  {
    id: 123,
    disease: { zh: '脑胶质瘤', en: 'Glioma' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '脑胶质瘤最常见的类型是什么？',
      en: 'What is the most common type of glioma?'
    },
    options: {
      zh: ['胶质母细胞瘤', '星形细胞瘤', '少突胶质细胞瘤', '室管膜瘤'],
      en: ['Glioblastoma', 'Astrocytoma', 'Oligodendroglioma', 'Ependymoma']
    },
    correctAnswer: 0,
    explanation: {
      zh: '胶质母细胞瘤（GBM）是最常见且恶性程度最高的脑胶质瘤。',
      en: 'Glioblastoma (GBM) is the most common and most malignant type of glioma.'
    }
  },
  {
    id: 124,
    disease: { zh: '脑膜瘤', en: 'Meningioma' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '脑膜瘤的特点是什么？',
      en: 'What is the characteristic of meningioma?'
    },
    options: {
      zh: ['大多数为良性，生长缓慢', '高度恶性', '快速生长', '易转移'],
      en: ['Mostly benign, slow-growing', 'Highly malignant', 'Rapid growth', 'Easily metastasizes']
    },
    correctAnswer: 0,
    explanation: {
      zh: '脑膜瘤大多数为良性（WHO I级），生长缓慢，预后较好。',
      en: 'Most meningiomas are benign (WHO Grade I), slow-growing, with good prognosis.'
    }
  },
  {
    id: 125,
    disease: { zh: '鼻咽癌', en: 'Nasopharyngeal Carcinoma' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '鼻咽癌最常见的首发症状是什么？',
      en: 'What is the most common initial symptom of nasopharyngeal carcinoma?'
    },
    options: {
      zh: ['颈部肿块（淋巴结转移）', '鼻塞', '鼻出血', '耳鸣'],
      en: ['Neck mass (lymph node metastasis)', 'Nasal congestion', 'Epistaxis', 'Tinnitus']
    },
    correctAnswer: 0,
    explanation: {
      zh: '鼻咽癌最常见首发症状是颈部无痛性肿块，约60-80%患者以颈部肿块就诊。',
      en: 'Most common initial symptom of NPC is painless neck mass, about 60-80% present with neck mass.'
    }
  },
  {
    id: 126,
    disease: { zh: '喉癌', en: 'Laryngeal Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '声门型喉癌最典型的症状是什么？',
      en: 'What is the most typical symptom of glottic laryngeal cancer?'
    },
    options: {
      zh: ['声嘶', '呼吸困难', '吞咽困难', '颈部肿块'],
      en: ['Hoarseness', 'Dyspnea', 'Dysphagia', 'Neck mass']
    },
    correctAnswer: 0,
    explanation: {
      zh: '声门型喉癌最早出现的症状是声嘶，因肿瘤影响声带运动。',
      en: 'The earliest symptom of glottic laryngeal cancer is hoarseness, due to tumor affecting vocal cord movement.'
    }
  },
  {
    id: 127,
    disease: { zh: '睾丸癌', en: 'Testicular Cancer' },
    treatmentDays: 180,
    category: 'critical',
    question: {
      zh: '睾丸癌最常见的首发症状是什么？',
      en: 'What is the most common initial symptom of testicular cancer?'
    },
    options: {
      zh: ['无痛性睾丸肿块', '睾丸疼痛', '阴囊红肿', '发热'],
      en: ['Painless testicular mass', 'Testicular pain', 'Scrotal redness', 'Fever']
    },
    correctAnswer: 0,
    explanation: {
      zh: '睾丸癌典型表现为无痛性睾丸肿大或肿块。',
      en: 'Typical presentation of testicular cancer is painless testicular enlargement or mass.'
    }
  },
  {
    id: 128,
    disease: { zh: '阴茎癌', en: 'Penile Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '阴茎癌最主要的危险因素是什么？',
      en: 'What is the main risk factor for penile cancer?'
    },
    options: {
      zh: ['包茎和包皮过长', 'HPV感染', '吸烟', '慢性炎症'],
      en: ['Phimosis and redundant prepuce', 'HPV infection', 'Smoking', 'Chronic inflammation']
    },
    correctAnswer: 0,
    explanation: {
      zh: '包茎和包皮过长是阴茎癌最主要的危险因素，包皮垢的慢性刺激是重要病因。',
      en: 'Phimosis and redundant prepuce are the main risk factors for penile cancer, with chronic irritation from smegma being an important cause.'
    }
  },
  {
    id: 129,
    disease: { zh: '外阴癌', en: 'Vulvar Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '外阴癌最常见的病理类型是什么？',
      en: 'What is the most common pathological type of vulvar cancer?'
    },
    options: {
      zh: ['鳞状细胞癌', '腺癌', '黑色素瘤', '基底细胞癌'],
      en: ['Squamous cell carcinoma', 'Adenocarcinoma', 'Melanoma', 'Basal cell carcinoma']
    },
    correctAnswer: 0,
    explanation: {
      zh: '鳞状细胞癌是外阴癌最常见的类型，占90%以上。',
      en: 'Squamous cell carcinoma is the most common type of vulvar cancer, accounting for over 90%.'
    }
  },
  {
    id: 130,
    disease: { zh: '阴道癌', en: 'Vaginal Cancer' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '原发性阴道癌最常见的症状是什么？',
      en: 'What is the most common symptom of primary vaginal cancer?'
    },
    options: {
      zh: ['阴道出血', '阴道分泌物增多', '阴道肿块', '排尿困难'],
      en: ['Vaginal bleeding', 'Increased vaginal discharge', 'Vaginal mass', 'Dysuria']
    },
    correctAnswer: 0,
    explanation: {
      zh: '原发性阴道癌最常见症状是不规则阴道出血，尤其是绝经后出血。',
      en: 'Most common symptom of primary vaginal cancer is irregular vaginal bleeding, especially postmenopausal bleeding.'
    }
  },
  {
    id: 131,
    disease: { zh: '绒毛膜癌', en: 'Choriocarcinoma' },
    treatmentDays: 180,
    category: 'critical',
    question: {
      zh: '绒毛膜癌最常用的肿瘤标志物是什么？',
      en: 'What is the most commonly used tumor marker for choriocarcinoma?'
    },
    options: {
      zh: ['hCG（人绒毛膜促性腺激素）', 'AFP', 'CA125', 'CEA'],
      en: ['hCG (Human Chorionic Gonadotropin)', 'AFP', 'CA125', 'CEA']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'hCG是绒毛膜癌最特异和敏感的肿瘤标志物，用于诊断和随访。',
      en: 'hCG is the most specific and sensitive tumor marker for choriocarcinoma, used for diagnosis and follow-up.'
    }
  },
  {
    id: 132,
    disease: { zh: '恶性畸胎瘤', en: 'Malignant Teratoma' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '畸胎瘤最常见的部位是？',
      en: 'What is the most common site of teratoma?'
    },
    options: {
      zh: ['卵巢和睾丸', '纵隔', '骶尾部', '腹膜后'],
      en: ['Ovary and testis', 'Mediastinum', 'Sacrococcygeal', 'Retroperitoneum']
    },
    correctAnswer: 0,
    explanation: {
      zh: '畸胎瘤最常见于性腺（卵巢和睾丸），也可发生在纵隔、骶尾部等中线部位。',
      en: 'Teratomas most commonly occur in gonads (ovary and testis), also in midline structures like mediastinum, sacrococcygeal region.'
    }
  },
  {
    id: 133,
    disease: { zh: '骨髓增生异常综合征', en: 'Myelodysplastic Syndrome' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: 'MDS的主要特征是什么？',
      en: 'What is the main feature of MDS?'
    },
    options: {
      zh: ['病态造血和高风险向急性白血病转化', '骨髓增生低下', '全血细胞增多', '淋巴结肿大'],
      en: ['Dysplastic hematopoiesis and high risk of transformation to acute leukemia', 'Hypocellular bone marrow', 'Pancytosis', 'Lymphadenopathy']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'MDS特征是骨髓病态造血，外周血细胞减少，高风险向急性髓系白血病转化。',
      en: 'MDS is characterized by dysplastic hematopoiesis, peripheral cytopenia, and high risk of transformation to AML.'
    }
  },
  {
    id: 134,
    disease: { zh: '骨髓纤维化', en: 'Myelofibrosis' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '原发性骨髓纤维化的特征性表现是什么？',
      en: 'What is the characteristic presentation of primary myelofibrosis?'
    },
    options: {
      zh: ['巨脾和泪滴状红细胞', '淋巴结肿大', '骨痛', '发热'],
      en: ['Massive splenomegaly and teardrop red cells', 'Lymphadenopathy', 'Bone pain', 'Fever']
    },
    correctAnswer: 0,
    explanation: {
      zh: '原发性骨髓纤维化特征：巨脾、外周血出现泪滴状红细胞、骨髓纤维化。',
      en: 'Primary myelofibrosis features: massive splenomegaly, teardrop red cells in peripheral blood, bone marrow fibrosis.'
    }
  },
  {
    id: 135,
    disease: { zh: '真性红细胞增多症', en: 'Polycythemia Vera' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: 'PV的主要诊断标准包括什么？',
      en: 'What are the main diagnostic criteria for PV?'
    },
    options: {
      zh: ['血红蛋白/红细胞增多，JAK2突变', '白细胞增多', '血小板增多', '脾肿大'],
      en: ['Hemoglobin/red cell increase, JAK2 mutation', 'Leukocytosis', 'Thrombocytosis', 'Splenomegaly']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'PV主要诊断标准：血红蛋白/红细胞增多，骨髓增生，JAK2 V617F突变。',
      en: 'Main PV diagnostic criteria: hemoglobin/red cell increase, bone marrow hypercellularity, JAK2 V617F mutation.'
    }
  },
  {
    id: 136,
    disease: { zh: '原发性血小板增多症', en: 'Essential Thrombocythemia' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: 'ET的主要特征是？',
      en: 'What is the main feature of ET?'
    },
    options: {
      zh: ['血小板持续增多>450×10^9/L', '白细胞增多', '红细胞增多', '贫血'],
      en: ['Persistent thrombocytosis >450×10^9/L', 'Leukocytosis', 'Polycythemia', 'Anemia']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'ET特征是血小板持续增多>450×10^9/L，伴巨核细胞增生。',
      en: 'ET is characterized by persistent thrombocytosis >450×10^9/L, with megakaryocyte hyperplasia.'
    }
  },
  {
    id: 137,
    disease: { zh: '嗜铬细胞瘤', en: 'Pheochromocytoma' },
    treatmentDays: 60,
    category: 'critical',
    question: {
      zh: '嗜铬细胞瘤的典型三联征是什么？',
      en: 'What is the classic triad of pheochromocytoma?'
    },
    options: {
      zh: ['阵发性高血压、头痛、心悸多汗', '发热、体重减轻、乏力', '腹痛、腹泻、呕吐', '黄疸、腹水、肝肿大'],
      en: ['Paroxysmal hypertension, headache, palpitations and sweating', 'Fever, weight loss, fatigue', 'Abdominal pain, diarrhea, vomiting', 'Jaundice, ascites, hepatomegaly']
    },
    correctAnswer: 0,
    explanation: {
      zh: '嗜铬细胞瘤典型三联征：阵发性高血压、剧烈头痛、心悸多汗。',
      en: 'Classic triad of pheochromocytoma: paroxysmal hypertension, severe headache, palpitations and sweating.'
    }
  },
  {
    id: 138,
    disease: { zh: '库欣综合征', en: 'Cushing\'s Syndrome' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '库欣综合征的典型表现是什么？',
      en: 'What is the typical presentation of Cushing\'s syndrome?'
    },
    options: {
      zh: ['向心性肥胖、满月脸、水牛背、紫纹', '消瘦、突眼、甲状腺肿大', '皮肤色素沉着、低血压、低血糖', '高大身材、手足肥大'],
      en: ['Central obesity, moon face, buffalo hump, purple striae', 'Emaciation, exophthalmos, goiter', 'Skin hyperpigmentation, hypotension, hypoglycemia', 'Tall stature, acromegaly']
    },
    correctAnswer: 0,
    explanation: {
      zh: '库欣综合征典型表现：向心性肥胖、满月脸、水牛背、腹部紫纹、高血压、高血糖。',
      en: 'Typical Cushing\'s: central obesity, moon face, buffalo hump, abdominal purple striae, hypertension, hyperglycemia.'
    }
  },
  {
    id: 139,
    disease: { zh: '艾迪生病', en: 'Addison\'s Disease' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '原发性肾上腺皮质功能减退症最特征性的表现是什么？',
      en: 'What is the most characteristic manifestation of primary adrenal insufficiency?'
    },
    options: {
      zh: ['皮肤和黏膜色素沉着', '向心性肥胖', '高血压', '高血糖'],
      en: ['Skin and mucosal hyperpigmentation', 'Central obesity', 'Hypertension', 'Hyperglycemia']
    },
    correctAnswer: 0,
    explanation: {
      zh: '艾迪生病特征性表现是皮肤和黏膜色素沉着，尤其暴露部位和摩擦部位。',
      en: 'Characteristic feature of Addison\'s disease is skin and mucosal hyperpigmentation, especially in exposed and friction areas.'
    }
  },
  {
    id: 140,
    disease: { zh: '肢端肥大症', en: 'Acromegaly' },
    treatmentDays: 365,
    category: 'critical',
    question: {
      zh: '肢端肥大症最常见的病因是什么？',
      en: 'What is the most common cause of acromegaly?'
    },
    options: {
      zh: ['垂体GH腺瘤', '下丘脑肿瘤', '异位GH分泌', '遗传因素'],
      en: ['Pituitary GH adenoma', 'Hypothalamic tumor', 'Ectopic GH secretion', 'Genetic factors']
    },
    correctAnswer: 0,
    explanation: {
      zh: '肢端肥大症绝大多数（95%以上）由垂体GH腺瘤引起。',
      en: 'Over 95% of acromegaly cases are caused by pituitary GH adenomas.'
    }
  },
  {
    id: 141,
    disease: { zh: '晚期肺癌', en: 'Advanced Lung Cancer' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '晚期非小细胞肺癌最常用的靶向治疗基因突变是什么？',
      en: 'What is the most common targeted therapy gene mutation in advanced NSCLC?'
    },
    options: {
      zh: ['EGFR突变', 'KRAS突变', 'ALK融合', 'ROS1融合'],
      en: ['EGFR mutation', 'KRAS mutation', 'ALK fusion', 'ROS1 fusion']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'EGFR突变是亚洲非小细胞肺癌最常见的靶向治疗相关基因突变，约40-50%的腺癌患者携带。',
      en: 'EGFR mutation is the most common targeted therapy-related gene mutation in Asian NSCLC patients, found in about 40-50% of adenocarcinoma patients.'
    }
  },
  {
    id: 142,
    disease: { zh: '晚期肝癌', en: 'Advanced Liver Cancer' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '晚期肝细胞癌最常用的全身治疗药物是什么？',
      en: 'What is the most commonly used systemic treatment for advanced hepatocellular carcinoma?'
    },
    options: {
      zh: ['索拉非尼', '顺铂', '紫杉醇', '甲氨蝶呤'],
      en: ['Sorafenib', 'Cisplatin', 'Paclitaxel', 'Methotrexate']
    },
    correctAnswer: 0,
    explanation: {
      zh: '索拉非尼是晚期肝细胞癌一线全身治疗的经典药物，是一种多靶点酪氨酸激酶抑制剂。',
      en: 'Sorafenib is a classic first-line systemic treatment for advanced HCC, a multi-target tyrosine kinase inhibitor.'
    }
  },
  {
    id: 143,
    disease: { zh: '晚期胃癌', en: 'Advanced Gastric Cancer' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '晚期胃癌一线化疗最常用的方案是什么？',
      en: 'What is the most commonly used first-line chemotherapy regimen for advanced gastric cancer?'
    },
    options: {
      zh: ['氟尿嘧啶+铂类', '紫杉醇单药', '吉西他滨+顺铂', '长春瑞滨+奥沙利铂'],
      en: ['Fluorouracil + platinum', 'Paclitaxel monotherapy', 'Gemcitabine + cisplatin', 'Vinorelbine + oxaliplatin']
    },
    correctAnswer: 0,
    explanation: {
      zh: '氟尿嘧啶（5-FU或卡培他滨）联合铂类（奥沙利铂或顺铂）是晚期胃癌一线化疗的基础方案。',
      en: 'Fluorouracil (5-FU or capecitabine) combined with platinum (oxaliplatin or cisplatin) is the backbone first-line chemotherapy for advanced gastric cancer.'
    }
  },
  {
    id: 144,
    disease: { zh: '晚期胰腺癌', en: 'Advanced Pancreatic Cancer' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '胰腺癌被称为"癌中之王"的主要原因是什么？',
      en: 'Why is pancreatic cancer called the "king of cancers"?'
    },
    options: {
      zh: ['早期难以发现，预后极差，5年生存率低于10%', '肿瘤最大', '传染性最强', '疼痛最剧烈'],
      en: ['Hard to detect early, extremely poor prognosis, 5-year survival rate below 10%', 'Largest tumor', 'Most contagious', 'Most painful']
    },
    correctAnswer: 0,
    explanation: {
      zh: '胰腺癌早期症状隐匿，大多数患者确诊时已晚期，5年生存率不足10%，是所有常见癌症中最低的。',
      en: 'Pancreatic cancer has insidious early symptoms, most patients are diagnosed at late stages, with a 5-year survival rate below 10%, the lowest among common cancers.'
    }
  },
  {
    id: 145,
    disease: { zh: '晚期食管癌', en: 'Advanced Esophageal Cancer' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '中国食管癌最常见的病理类型是什么？',
      en: 'What is the most common pathological type of esophageal cancer in China?'
    },
    options: {
      zh: ['鳞状细胞癌', '腺癌', '小细胞癌', '未分化癌'],
      en: ['Squamous cell carcinoma', 'Adenocarcinoma', 'Small cell carcinoma', 'Undifferentiated carcinoma']
    },
    correctAnswer: 0,
    explanation: {
      zh: '在中国，食管鳞状细胞癌占食管癌的90%以上，与西方以腺癌为主不同。',
      en: 'In China, esophageal squamous cell carcinoma accounts for over 90% of esophageal cancers, unlike the West where adenocarcinoma predominates.'
    }
  },
  {
    id: 146,
    disease: { zh: '晚期结直肠癌', en: 'Advanced Colorectal Cancer' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '转移性结直肠癌治疗前必须检测的基因状态是什么？',
      en: 'What gene status must be tested before treating metastatic colorectal cancer?'
    },
    options: {
      zh: ['KRAS/NRAS/BRAF突变状态', 'HER2扩增', 'PD-L1表达', 'BRCA突变'],
      en: ['KRAS/NRAS/BRAF mutation status', 'HER2 amplification', 'PD-L1 expression', 'BRCA mutation']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'KRAS/NRAS/BRAF突变状态决定抗EGFR靶向治疗（西妥昔单抗等）是否有效，是必须检测的。',
      en: 'KRAS/NRAS/BRAF mutation status determines whether anti-EGFR targeted therapy (cetuximab, etc.) is effective, and must be tested.'
    }
  },
  {
    id: 147,
    disease: { zh: '晚期乳腺癌', en: 'Advanced Breast Cancer' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'HR阳性/HER2阴性晚期乳腺癌一线治疗首选什么？',
      en: 'What is the first-line treatment for HR+/HER2- advanced breast cancer?'
    },
    options: {
      zh: ['内分泌治疗（CDK4/6抑制剂+芳香化酶抑制剂）', '化疗', '放疗', '免疫治疗'],
      en: ['Endocrine therapy (CDK4/6 inhibitor + aromatase inhibitor)', 'Chemotherapy', 'Radiotherapy', 'Immunotherapy']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'HR+/HER2-晚期乳腺癌一线首选CDK4/6抑制剂联合内分泌治疗，可显著延长无进展生存期。',
      en: 'First-line treatment for HR+/HER2- advanced breast cancer is CDK4/6 inhibitor combined with endocrine therapy, significantly extending PFS.'
    }
  },
  {
    id: 148,
    disease: { zh: '三阴性乳腺癌', en: 'Triple-Negative Breast Cancer' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '三阴性乳腺癌的定义是什么？',
      en: 'What is the definition of triple-negative breast cancer?'
    },
    options: {
      zh: ['ER阴性、PR阴性、HER2阴性', 'ER阳性、PR阴性、HER2阴性', 'ER阴性、PR阳性、HER2阳性', 'ER阳性、PR阳性、HER2阳性'],
      en: ['ER negative, PR negative, HER2 negative', 'ER positive, PR negative, HER2 negative', 'ER negative, PR positive, HER2 positive', 'ER positive, PR positive, HER2 positive']
    },
    correctAnswer: 0,
    explanation: {
      zh: '三阴性乳腺癌指ER、PR、HER2均为阴性，缺乏内分泌和HER2靶向治疗靶点，预后较差。',
      en: 'Triple-negative breast cancer means ER, PR, and HER2 are all negative, lacking targets for endocrine and HER2-targeted therapy, with poorer prognosis.'
    }
  },
  {
    id: 149,
    disease: { zh: '晚期宫颈癌', en: 'Advanced Cervical Cancer' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '晚期宫颈癌最常用的化疗方案是什么？',
      en: 'What is the most commonly used chemotherapy regimen for advanced cervical cancer?'
    },
    options: {
      zh: ['顺铂+紫杉醇±贝伐珠单抗', '顺铂单药', '卡铂+吉西他滨', '多西他赛+卡铂'],
      en: ['Cisplatin + paclitaxel ± bevacizumab', 'Cisplatin monotherapy', 'Carboplatin + gemcitabine', 'Docetaxel + carboplatin']
    },
    correctAnswer: 0,
    explanation: {
      zh: '顺铂联合紫杉醇加贝伐珠单抗是晚期宫颈癌的标准一线方案，可延长总生存期。',
      en: 'Cisplatin plus paclitaxel with bevacizumab is the standard first-line regimen for advanced cervical cancer, extending overall survival.'
    }
  },
  {
    id: 150,
    disease: { zh: '晚期卵巢癌', en: 'Advanced Ovarian Cancer' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '晚期卵巢癌的标准治疗模式是什么？',
      en: 'What is the standard treatment model for advanced ovarian cancer?'
    },
    options: {
      zh: ['肿瘤细胞减灭术+铂类联合化疗', '单纯化疗', '单纯放疗', '免疫治疗'],
      en: ['Cytoreductive surgery + platinum-based chemotherapy', 'Chemotherapy alone', 'Radiotherapy alone', 'Immunotherapy']
    },
    correctAnswer: 0,
    explanation: {
      zh: '晚期卵巢癌标准治疗是最大程度的肿瘤细胞减灭术，术后辅以铂类联合紫杉醇化疗。',
      en: 'Standard treatment for advanced ovarian cancer is maximal cytoreductive surgery, followed by platinum-based paclitaxel chemotherapy.'
    }
  },
  {
    id: 151,
    disease: { zh: '终末期肺癌脑转移', en: 'Terminal Lung Cancer with Brain Metastasis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '肺癌脑转移最常用的局部治疗方法是什么？',
      en: 'What is the most commonly used local treatment for lung cancer brain metastasis?'
    },
    options: {
      zh: ['全脑放疗或立体定向放疗', '开颅手术', '化疗', '观察等待'],
      en: ['Whole brain radiotherapy or stereotactic radiotherapy', 'Craniotomy', 'Chemotherapy', 'Watch and wait']
    },
    correctAnswer: 0,
    explanation: {
      zh: '肺癌脑转移局部治疗以放疗为主，多发转移用全脑放疗，寡转移可用立体定向放疗（如伽马刀）。',
      en: 'Local treatment for lung cancer brain metastasis is mainly radiotherapy: whole brain RT for multiple metastases, stereotactic RT (e.g., gamma knife) for oligometastases.'
    }
  },
  {
    id: 152,
    disease: { zh: '终末期肝癌伴肝衰竭', en: 'Terminal Liver Cancer with Liver Failure' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'Child-Pugh评分系统用于评估什么？',
      en: 'What does the Child-Pugh scoring system assess?'
    },
    options: {
      zh: ['肝功能储备', '肾功能', '心功能', '肺功能'],
      en: ['Liver function reserve', 'Kidney function', 'Heart function', 'Lung function']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'Child-Pugh评分通过胆红素、白蛋白、凝血酶原时间、腹水、肝性脑病五项指标评估肝功能储备。',
      en: 'Child-Pugh score assesses liver function reserve through five indicators: bilirubin, albumin, prothrombin time, ascites, and hepatic encephalopathy.'
    }
  },
  {
    id: 153,
    disease: { zh: '终末期肾衰竭', en: 'End-Stage Renal Failure' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '终末期肾病（ESRD）的肾小球滤过率（GFR）标准是什么？',
      en: 'What is the GFR criteria for end-stage renal disease (ESRD)?'
    },
    options: {
      zh: ['GFR < 15 mL/min/1.73m²', 'GFR < 30', 'GFR < 60', 'GFR < 90'],
      en: ['GFR < 15 mL/min/1.73m²', 'GFR < 30', 'GFR < 60', 'GFR < 90']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'CKD 5期（ESRD）标准为GFR < 15 mL/min/1.73m²，需要透析或肾移植维持生命。',
      en: 'CKD stage 5 (ESRD) criteria is GFR < 15 mL/min/1.73m², requiring dialysis or kidney transplant to sustain life.'
    }
  },
  {
    id: 154,
    disease: { zh: '终末期心力衰竭', en: 'End-Stage Heart Failure' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'NYHA心功能分级IV级的表现是什么？',
      en: 'What is the presentation of NYHA functional class IV?'
    },
    options: {
      zh: ['休息时也有症状，任何体力活动都加重', '轻度活动即有症状', '日常活动无症状', '剧烈活动才有症状'],
      en: ['Symptoms at rest, worsened by any physical activity', 'Symptoms with mild activity', 'No symptoms with daily activities', 'Symptoms only with strenuous activity']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'NYHA IV级：休息时即有症状，任何体力活动都会加重，是心功能最差的级别。',
      en: 'NYHA Class IV: symptoms at rest, worsened by any physical activity, the worst functional class.'
    }
  },
  {
    id: 155,
    disease: { zh: '终末期慢阻肺', en: 'End-Stage COPD' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'GOLD分级4级（极重度）COPD的FEV1标准是什么？',
      en: 'What is the FEV1 criteria for GOLD grade 4 (very severe) COPD?'
    },
    options: {
      zh: ['FEV1 < 30%预计值', 'FEV1 < 50%', 'FEV1 < 80%', 'FEV1 < 70%'],
      en: ['FEV1 < 30% predicted', 'FEV1 < 50%', 'FEV1 < 80%', 'FEV1 < 70%']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'GOLD 4级（极重度）：FEV1 < 30%预计值，或FEV1 < 50%伴慢性呼吸衰竭。',
      en: 'GOLD Grade 4 (very severe): FEV1 < 30% predicted, or FEV1 < 50% with chronic respiratory failure.'
    }
  },
  {
    id: 156,
    disease: { zh: '终末期艾滋病', en: 'Terminal AIDS' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '艾滋病诊断标准中CD4+T细胞计数的关键阈值是多少？',
      en: 'What is the key CD4+ T cell count threshold for AIDS diagnosis?'
    },
    options: {
      zh: ['CD4 < 200个/μL', 'CD4 < 500', 'CD4 < 1000', 'CD4 < 50'],
      en: ['CD4 < 200 cells/μL', 'CD4 < 500', 'CD4 < 1000', 'CD4 < 50']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'HIV感染者CD4+T细胞<200个/μL，或出现特定机会性感染/肿瘤，即诊断为AIDS。',
      en: 'HIV-infected persons with CD4 < 200 cells/μL, or specific opportunistic infections/tumors, are diagnosed with AIDS.'
    }
  },
  {
    id: 157,
    disease: { zh: '终末期多器官功能衰竭', en: 'Terminal Multiple Organ Failure' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'MODS（多器官功能障碍综合征）最常见的始动器官是什么？',
      en: 'What is the most common initiating organ in MODS?'
    },
    options: {
      zh: ['肺', '肝', '肾', '心'],
      en: ['Lung', 'Liver', 'Kidney', 'Heart']
    },
    correctAnswer: 0,
    explanation: {
      zh: '肺是MODS中最常受累且常为始动器官，急性呼吸窘迫综合征（ARDS）常为首发表现。',
      en: 'The lung is the most commonly affected and often initiating organ in MODS, with ARDS often being the first manifestation.'
    }
  },
  {
    id: 158,
    disease: { zh: '终末期肌萎缩侧索硬化', en: 'Terminal ALS' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '肌萎缩侧索硬化症（ALS）最常见的死因是什么？',
      en: 'What is the most common cause of death in ALS?'
    },
    options: {
      zh: ['呼吸衰竭', '心力衰竭', '肾衰竭', '感染'],
      en: ['Respiratory failure', 'Heart failure', 'Renal failure', 'Infection']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'ALS最终因呼吸肌麻痹导致呼吸衰竭死亡，平均生存期3-5年。',
      en: 'ALS ultimately leads to death from respiratory failure due to respiratory muscle paralysis, with an average survival of 3-5 years.'
    }
  },
  {
    id: 159,
    disease: { zh: '终末期帕金森病', en: 'Terminal Parkinson\'s Disease' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '晚期帕金森病患者最常见的致死原因是什么？',
      en: 'What is the most common cause of death in late-stage Parkinson\'s disease?'
    },
    options: {
      zh: ['吸入性肺炎', '心肌梗死', '脑卒中', '肾衰竭'],
      en: ['Aspiration pneumonia', 'Myocardial infarction', 'Stroke', 'Renal failure']
    },
    correctAnswer: 0,
    explanation: {
      zh: '晚期帕金森病患者因吞咽功能障碍，吸入性肺炎是最常见的致死原因。',
      en: 'In late-stage PD patients, aspiration pneumonia is the most common cause of death due to swallowing dysfunction.'
    }
  },
  {
    id: 160,
    disease: { zh: '终末期阿尔茨海默病', en: 'Terminal Alzheimer\'s Disease' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '阿尔茨海默病终末期患者最常见的死亡原因是什么？',
      en: 'What is the most common cause of death in terminal Alzheimer\'s patients?'
    },
    options: {
      zh: ['肺部感染（肺炎）', '心脏病', '癌症', '脑出血'],
      en: ['Pulmonary infection (pneumonia)', 'Heart disease', 'Cancer', 'Cerebral hemorrhage']
    },
    correctAnswer: 0,
    explanation: {
      zh: '终末期AD患者长期卧床、吞咽困难，肺部感染是最常见的直接死亡原因。',
      en: 'Terminal AD patients are bedridden with swallowing difficulties; pulmonary infection is the most common direct cause of death.'
    }
  },
  {
    id: 161,
    disease: { zh: '终末期弥漫大B细胞淋巴瘤', en: 'Terminal DLBCL' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '弥漫大B细胞淋巴瘤的标准一线治疗方案是什么？',
      en: 'What is the standard first-line treatment for DLBCL?'
    },
    options: {
      zh: ['R-CHOP方案', 'ABVD方案', 'Hyper-CVAD方案', 'FCR方案'],
      en: ['R-CHOP regimen', 'ABVD regimen', 'Hyper-CVAD regimen', 'FCR regimen']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'R-CHOP（利妥昔单抗+环磷酰胺+多柔比星+长春新碱+泼尼松）是DLBCL的标准一线方案。',
      en: 'R-CHOP (rituximab + cyclophosphamide + doxorubicin + vincristine + prednisone) is the standard first-line regimen for DLBCL.'
    }
  },
  {
    id: 162,
    disease: { zh: '终末期急性髓系白血病', en: 'Terminal AML' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '急性髓系白血病（非APL）的标准诱导缓解方案是什么？',
      en: 'What is the standard induction regimen for AML (non-APL)?'
    },
    options: {
      zh: ['DA方案（柔红霉素+阿糖胞苷）', 'VDLP方案', 'CHOP方案', 'MOPP方案'],
      en: ['DA regimen (daunorubicin + cytarabine)', 'VDLP regimen', 'CHOP regimen', 'MOPP regimen']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'DA方案（3+7方案）是AML标准诱导缓解方案：柔红霉素3天+阿糖胞苷7天持续静脉滴注。',
      en: 'DA regimen (3+7) is the standard induction for AML: daunorubicin for 3 days + cytarabine continuous infusion for 7 days.'
    }
  },
  {
    id: 163,
    disease: { zh: '终末期胶质母细胞瘤', en: 'Terminal Glioblastoma' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '胶质母细胞瘤（GBM）的标准治疗方案（Stupp方案）包括什么？',
      en: 'What does the standard Stupp regimen for GBM include?'
    },
    options: {
      zh: ['最大安全切除+同步放化疗（替莫唑胺）+辅助化疗', '单纯手术', '单纯放疗', '单纯化疗'],
      en: ['Maximal safe resection + concurrent chemoradiotherapy (temozolomide) + adjuvant chemotherapy', 'Surgery alone', 'Radiotherapy alone', 'Chemotherapy alone']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'Stupp方案：最大安全切除后同步放疗+替莫唑胺化疗，再行6周期辅助替莫唑胺，是GBM标准治疗。',
      en: 'Stupp regimen: maximal safe resection followed by concurrent RT + temozolomide, then 6 cycles of adjuvant temozolomide, is the standard treatment for GBM.'
    }
  },
  {
    id: 164,
    disease: { zh: '终末期骨肉瘤伴肺转移', en: 'Terminal Osteosarcoma with Lung Metastasis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '骨肉瘤的标准化疗方案是什么？',
      en: 'What is the standard chemotherapy regimen for osteosarcoma?'
    },
    options: {
      zh: ['MAP方案（大剂量甲氨蝶呤+多柔比星+顺铂）', 'CHOP方案', 'ABVD方案', 'FOLFOX方案'],
      en: ['MAP regimen (high-dose methotrexate + doxorubicin + cisplatin)', 'CHOP regimen', 'ABVD regimen', 'FOLFOX regimen']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'MAP方案是骨肉瘤的标准一线化疗方案，通常术前新辅助+术后辅助化疗。',
      en: 'MAP regimen is the standard first-line chemotherapy for osteosarcoma, usually given as neoadjuvant before surgery and adjuvant after.'
    }
  },
  {
    id: 165,
    disease: { zh: '终末期黑色素瘤远处转移', en: 'Terminal Metastatic Melanoma' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '晚期黑色素瘤革命性的治疗方法是什么？',
      en: 'What is the revolutionary treatment for advanced melanoma?'
    },
    options: {
      zh: ['免疫检查点抑制剂（PD-1抗体±CTLA-4抗体）', '传统化疗', '放疗', '激素治疗'],
      en: ['Immune checkpoint inhibitors (PD-1 antibody ± CTLA-4 antibody)', 'Traditional chemotherapy', 'Radiotherapy', 'Hormonal therapy']
    },
    correctAnswer: 0,
    explanation: {
      zh: '免疫检查点抑制剂（如帕博利珠单抗、纳武利尤单抗±伊匹木单抗）彻底改变了晚期黑色素瘤的治疗格局。',
      en: 'Immune checkpoint inhibitors (e.g., pembrolizumab, nivolumab ± ipilimumab) have revolutionized the treatment landscape of advanced melanoma.'
    }
  },
  {
    id: 166,
    disease: { zh: '终末期鼻咽癌', en: 'Terminal Nasopharyngeal Carcinoma' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '鼻咽癌的首选治疗方法是什么？',
      en: 'What is the preferred treatment for nasopharyngeal carcinoma?'
    },
    options: {
      zh: ['放射治疗', '手术切除', '化疗', '免疫治疗'],
      en: ['Radiotherapy', 'Surgical resection', 'Chemotherapy', 'Immunotherapy']
    },
    correctAnswer: 0,
    explanation: {
      zh: '鼻咽癌因解剖位置特殊且对放疗敏感，放射治疗是首选方法，晚期加用化疗。',
      en: 'Due to its special anatomical location and radiosensitivity, radiotherapy is the preferred treatment for NPC, with chemotherapy added for advanced stages.'
    }
  },
  {
    id: 167,
    disease: { zh: '终末期恶性胸膜间皮瘤', en: 'Terminal Malignant Pleural Mesothelioma' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '恶性胸膜间皮瘤最主要的致病因素是什么？',
      en: 'What is the main causative factor of malignant pleural mesothelioma?'
    },
    options: {
      zh: ['石棉暴露', '吸烟', '放射线', '病毒感染'],
      en: ['Asbestos exposure', 'Smoking', 'Radiation', 'Viral infection']
    },
    correctAnswer: 0,
    explanation: {
      zh: '石棉暴露是恶性胸膜间皮瘤最主要的致病因素，潜伏期可达20-40年。',
      en: 'Asbestos exposure is the main causative factor of malignant pleural mesothelioma, with a latency period of 20-40 years.'
    }
  },
  {
    id: 168,
    disease: { zh: '终末期胆管癌', en: 'Terminal Cholangiocarcinoma' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '肝内胆管癌最常用的肿瘤标志物是什么？',
      en: 'What is the most commonly used tumor marker for intrahepatic cholangiocarcinoma?'
    },
    options: {
      zh: ['CA19-9', 'AFP', 'CEA', 'CA125'],
      en: ['CA19-9', 'AFP', 'CEA', 'CA125']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'CA19-9是胆管癌最常用的肿瘤标志物，但特异性有限，需结合影像学诊断。',
      en: 'CA19-9 is the most commonly used tumor marker for cholangiocarcinoma, but has limited specificity and needs to be combined with imaging for diagnosis.'
    }
  },
  {
    id: 169,
    disease: { zh: '终末期甲状腺未分化癌', en: 'Terminal Anaplastic Thyroid Cancer' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '甲状腺未分化癌的特点是什么？',
      en: 'What characterizes anaplastic thyroid cancer?'
    },
    options: {
      zh: ['高度恶性，进展极快，预后极差，中位生存期仅数月', '低度恶性，缓慢生长', '预后最好', '最常见类型'],
      en: ['Highly malignant, extremely rapid progression, very poor prognosis, median survival only months', 'Low-grade malignant, slow-growing', 'Best prognosis', 'Most common type']
    },
    correctAnswer: 0,
    explanation: {
      zh: '甲状腺未分化癌是最恶性的甲状腺癌，进展极快，中位生存期仅3-6个月，对治疗反应差。',
      en: 'Anaplastic thyroid cancer is the most malignant thyroid cancer, extremely rapid progression, median survival only 3-6 months, poor response to treatment.'
    }
  },
  {
    id: 170,
    disease: { zh: '终末期多发性骨髓瘤', en: 'Terminal Multiple Myeloma' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '多发性骨髓瘤最常用的诱导治疗方案是什么？',
      en: 'What is the most commonly used induction regimen for multiple myeloma?'
    },
    options: {
      zh: ['VRd方案（硼替佐米+来那度胺+地塞米松）', 'CHOP方案', 'ABVD方案', 'FOLFOX方案'],
      en: ['VRd regimen (bortezomib + lenalidomide + dexamethasone)', 'CHOP regimen', 'ABVD regimen', 'FOLFOX regimen']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'VRd方案是适合移植的MM患者的标准诱导治疗方案。',
      en: 'VRd regimen is the standard induction treatment for transplant-eligible MM patients.'
    }
  },
  {
    id: 171,
    disease: { zh: '终末期慢性淋巴细胞白血病', en: 'Terminal CLL' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'CLL最常用的一线靶向治疗药物是什么？',
      en: 'What is the most commonly used first-line targeted drug for CLL?'
    },
    options: {
      zh: ['伊布替尼（BTK抑制剂）', '利妥昔单抗', '伊马替尼', '吉非替尼'],
      en: ['Ibrutinib (BTK inhibitor)', 'Rituximab', 'Imatinib', 'Gefitinib']
    },
    correctAnswer: 0,
    explanation: {
      zh: '伊布替尼是BTK抑制剂，已取代传统化疗成为CLL一线治疗的重要选择。',
      en: 'Ibrutinib is a BTK inhibitor that has replaced traditional chemotherapy as an important first-line treatment option for CLL.'
    }
  },
  {
    id: 172,
    disease: { zh: '终末期Castleman病', en: 'Terminal Castleman Disease' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '多中心型Castleman病与哪种病毒感染密切相关？',
      en: 'Which viral infection is closely associated with multicentric Castleman disease?'
    },
    options: {
      zh: ['HHV-8（人类疱疹病毒8型）', 'EB病毒', 'HIV', 'HBV'],
      en: ['HHV-8 (Human Herpesvirus 8)', 'Epstein-Barr virus', 'HIV', 'HBV']
    },
    correctAnswer: 0,
    explanation: {
      zh: '多中心型Castleman病与HHV-8感染密切相关，尤其在HIV感染者中更常见。',
      en: 'Multicentric Castleman disease is closely associated with HHV-8 infection, especially common in HIV-infected individuals.'
    }
  },
  {
    id: 173,
    disease: { zh: '终末期系统性血管炎', en: 'Terminal Systemic Vasculitis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'ANCA相关性血管炎的诱导缓解治疗首选什么？',
      en: 'What is the first-line induction treatment for ANCA-associated vasculitis?'
    },
    options: {
      zh: ['环磷酰胺或利妥昔单抗+糖皮质激素', '甲氨蝶呤单药', '硫唑嘌呤', '羟氯喹'],
      en: ['Cyclophosphamide or rituximab + glucocorticoids', 'Methotrexate monotherapy', 'Azathioprine', 'Hydroxychloroquine']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'ANCA相关性血管炎诱导缓解首选环磷酰胺或利妥昔单抗联合糖皮质激素。',
      en: 'Induction treatment for AAV is cyclophosphamide or rituximab combined with glucocorticoids.'
    }
  },
  {
    id: 174,
    disease: { zh: '终末期肺动脉高压', en: 'Terminal Pulmonary Arterial Hypertension' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '肺动脉高压确诊的血流动力学标准是什么？',
      en: 'What is the hemodynamic criteria for diagnosing pulmonary arterial hypertension?'
    },
    options: {
      zh: ['静息时平均肺动脉压≥25mmHg', '平均肺动脉压≥15mmHg', '平均肺动脉压≥35mmHg', '收缩压≥140mmHg'],
      en: ['Mean pulmonary artery pressure ≥25mmHg at rest', 'Mean PAP ≥15mmHg', 'Mean PAP ≥35mmHg', 'Systolic pressure ≥140mmHg']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'PAH诊断标准：右心导管测量静息时平均肺动脉压≥25mmHg，肺毛细血管楔压≤15mmHg。',
      en: 'PAH diagnostic criteria: mean pulmonary artery pressure ≥25mmHg at rest by right heart catheterization, PCWP ≤15mmHg.'
    }
  },
  {
    id: 175,
    disease: { zh: '终末期进行性核上性麻痹', en: 'Terminal Progressive Supranuclear Palsy' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '进行性核上性麻痹（PSP）最特征性的表现是什么？',
      en: 'What is the most characteristic manifestation of PSP?'
    },
    options: {
      zh: ['垂直性眼球运动障碍，尤其向下凝视困难', '水平眼球运动障碍', '瞳孔散大', '眼睑下垂'],
      en: ['Vertical gaze palsy, especially difficulty looking down', 'Horizontal gaze palsy', 'Pupil dilation', 'Ptosis']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'PSP最特征性表现是垂直性眼球运动障碍，尤其向下凝视困难，导致频繁跌倒。',
      en: 'The most characteristic feature of PSP is vertical gaze palsy, especially difficulty looking down, leading to frequent falls.'
    }
  },
  {
    id: 176,
    disease: { zh: '终末期克雅二氏病', en: 'Terminal Creutzfeldt-Jakob Disease' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '克雅二氏病（CJD）的致病因子是什么？',
      en: 'What is the causative agent of Creutzfeldt-Jakob disease (CJD)?'
    },
    options: {
      zh: ['朊蛋白（Prion）', '病毒', '细菌', '真菌'],
      en: ['Prion', 'Virus', 'Bacteria', 'Fungus']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'CJD由异常折叠的朊蛋白（PrPSc）引起，是一种可传播的海绵状脑病，目前无法治愈。',
      en: 'CJD is caused by abnormally folded prion protein (PrPSc), a transmissible spongiform encephalopathy, currently incurable.'
    }
  },
  {
    id: 177,
    disease: { zh: '终末期亨廷顿病', en: 'Terminal Huntington\'s Disease' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '亨廷顿病的遗传方式是什么？',
      en: 'What is the inheritance pattern of Huntington\'s disease?'
    },
    options: {
      zh: ['常染色体显性遗传', '常染色体隐性遗传', 'X连锁显性', 'X连锁隐性'],
      en: ['Autosomal dominant', 'Autosomal recessive', 'X-linked dominant', 'X-linked recessive']
    },
    correctAnswer: 0,
    explanation: {
      zh: '亨廷顿病是常染色体显性遗传病，由HTT基因CAG重复扩增引起，子女有50%遗传概率。',
      en: 'Huntington\'s disease is autosomal dominant, caused by CAG repeat expansion in the HTT gene, with 50% inheritance risk for offspring.'
    }
  },
  {
    id: 178,
    disease: { zh: '终末期肺纤维化', en: 'Terminal Pulmonary Fibrosis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '特发性肺纤维化（IPF）目前最有效的抗纤维化药物是什么？',
      en: 'What is the most effective anti-fibrotic drug for IPF?'
    },
    options: {
      zh: ['尼达尼布和吡非尼酮', '泼尼松', '环磷酰胺', '氨溴索'],
      en: ['Nintedanib and pirfenidone', 'Prednisone', 'Cyclophosphamide', 'Ambroxol']
    },
    correctAnswer: 0,
    explanation: {
      zh: '尼达尼布和吡非尼酮是目前IPF仅有的两种获批抗纤维化药物，可延缓肺功能下降。',
      en: 'Nintedanib and pirfenidone are currently the only two approved anti-fibrotic drugs for IPF, which can slow lung function decline.'
    }
  },
  {
    id: 179,
    disease: { zh: '终末期重症急性胰腺炎', en: 'Terminal Severe Acute Pancreatitis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '急性胰腺炎严重程度的评分系统中，最常用的是哪个？',
      en: 'What is the most commonly used scoring system for acute pancreatitis severity?'
    },
    options: {
      zh: ['Ranson评分和APACHE II评分', 'Child-Pugh评分', 'Glasgow评分', 'NYHA分级'],
      en: ['Ranson score and APACHE II score', 'Child-Pugh score', 'Glasgow score', 'NYHA classification']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'Ranson评分和APACHE II评分是评估急性胰腺炎严重程度最常用的系统。',
      en: 'Ranson score and APACHE II score are the most commonly used systems for assessing acute pancreatitis severity.'
    }
  },
  {
    id: 180,
    disease: { zh: '终末期感染性休克', en: 'Terminal Septic Shock' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '感染性休克的首要治疗措施是什么？',
      en: 'What is the primary treatment for septic shock?'
    },
    options: {
      zh: ['早期目标导向治疗（液体复苏+血管活性药物+抗生素）', '单纯使用抗生素', '单纯补液', '使用激素'],
      en: ['Early goal-directed therapy (fluid resuscitation + vasopressors + antibiotics)', 'Antibiotics alone', 'Fluid alone', 'Steroid use']
    },
    correctAnswer: 0,
    explanation: {
      zh: '感染性休克治疗核心：早期液体复苏、广谱抗生素、必要时血管活性药物维持血压。',
      en: 'Core treatment of septic shock: early fluid resuscitation, broad-spectrum antibiotics, vasopressors when needed to maintain blood pressure.'
    }
  },
  {
    id: 181,
    disease: { zh: '终末期急性呼吸窘迫综合征', en: 'Terminal ARDS' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'ARDS的柏林定义中，重度ARDS的PaO2/FiO2标准是什么？',
      en: 'What is the PaO2/FiO2 criteria for severe ARDS in the Berlin definition?'
    },
    options: {
      zh: ['PaO2/FiO2 ≤ 100mmHg', 'PaO2/FiO2 ≤ 200', 'PaO2/FiO2 ≤ 300', 'PaO2/FiO2 ≤ 400'],
      en: ['PaO2/FiO2 ≤ 100mmHg', 'PaO2/FiO2 ≤ 200', 'PaO2/FiO2 ≤ 300', 'PaO2/FiO2 ≤ 400']
    },
    correctAnswer: 0,
    explanation: {
      zh: '柏林定义：轻度PaO2/FiO2 200-300，中度100-200，重度≤100（PEEP≥5cmH2O）。',
      en: 'Berlin definition: mild PaO2/FiO2 200-300, moderate 100-200, severe ≤100 (with PEEP ≥5cmH2O).'
    }
  },
  {
    id: 182,
    disease: { zh: '终末期弥散性血管内凝血', en: 'Terminal DIC' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'DIC最核心的病理生理改变是什么？',
      en: 'What is the core pathophysiological change in DIC?'
    },
    options: {
      zh: ['全身微血管内广泛血栓形成和凝血因子消耗', '大血管血栓', '单纯出血', '红细胞破坏'],
      en: ['Widespread microvascular thrombosis and consumption of clotting factors', 'Large vessel thrombosis', 'Bleeding alone', 'Red blood cell destruction']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'DIC核心是全身微血管内广泛血栓形成，同时消耗大量凝血因子和血小板，导致出血和器官功能障碍。',
      en: 'The core of DIC is widespread microvascular thrombosis, simultaneously consuming clotting factors and platelets, leading to bleeding and organ dysfunction.'
    }
  },
  {
    id: 183,
    disease: { zh: '终末期恶性高血压', en: 'Terminal Malignant Hypertension' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '高血压急症的定义是什么？',
      en: 'What is the definition of hypertensive emergency?'
    },
    options: {
      zh: ['血压严重升高伴靶器官损害', '血压轻度升高无症状', '仅舒张压升高', '仅收缩压升高'],
      en: ['Severely elevated blood pressure with target organ damage', 'Mildly elevated BP without symptoms', 'Only diastolic elevation', 'Only systolic elevation']
    },
    correctAnswer: 0,
    explanation: {
      zh: '高血压急症定义：血压严重升高（通常>180/120mmHg）伴急性靶器官损害，需立即降压。',
      en: 'Hypertensive emergency: severely elevated BP (usually >180/120mmHg) with acute target organ damage, requiring immediate BP reduction.'
    }
  },
  {
    id: 184,
    disease: { zh: '终末期心脏黏液瘤', en: 'Terminal Cardiac Myxoma' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '心脏黏液瘤最常见的位置是？',
      en: 'What is the most common location of cardiac myxoma?'
    },
    options: {
      zh: ['左心房', '右心房', '左心室', '右心室'],
      en: ['Left atrium', 'Right atrium', 'Left ventricle', 'Right ventricle']
    },
    correctAnswer: 0,
    explanation: {
      zh: '约75%的心脏黏液瘤发生在左心房，通常附着在房间隔卵圆窝处。',
      en: 'About 75% of cardiac myxomas occur in the left atrium, usually attached to the fossa ovalis of the interatrial septum.'
    }
  },
  {
    id: 185,
    disease: { zh: '终末期腹主动脉瘤破裂', en: 'Terminal Ruptured AAA' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '腹主动脉瘤手术修复的直径阈值通常是多少？',
      en: 'What is the usual diameter threshold for AAA surgical repair?'
    },
    options: {
      zh: ['直径≥5.5cm', '直径≥3.0cm', '直径≥4.0cm', '直径≥7.0cm'],
      en: ['Diameter ≥5.5cm', 'Diameter ≥3.0cm', 'Diameter ≥4.0cm', 'Diameter ≥7.0cm']
    },
    correctAnswer: 0,
    explanation: {
      zh: '腹主动脉瘤直径≥5.5cm（女性≥5.0cm）或年增长>1cm时建议手术修复，以防止破裂。',
      en: 'Surgical repair is recommended for AAA diameter ≥5.5cm (women ≥5.0cm) or annual growth >1cm to prevent rupture.'
    }
  },
  {
    id: 186,
    disease: { zh: '终末期肠系膜动脉栓塞', en: 'Terminal Mesenteric Artery Embolism' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '急性肠系膜缺血最常见的病因是什么？',
      en: 'What is the most common cause of acute mesenteric ischemia?'
    },
    options: {
      zh: ['肠系膜上动脉栓塞', '肠系膜下动脉栓塞', '肠系膜静脉血栓', '主动脉夹层'],
      en: ['Superior mesenteric artery embolism', 'Inferior mesenteric artery embolism', 'Mesenteric venous thrombosis', 'Aortic dissection']
    },
    correctAnswer: 0,
    explanation: {
      zh: '肠系膜上动脉栓塞是急性肠系膜缺血最常见的原因，栓子多来源于心房颤动。',
      en: 'SMA embolism is the most common cause of acute mesenteric ischemia, with emboli often originating from atrial fibrillation.'
    }
  },
  {
    id: 187,
    disease: { zh: '终末期急性肝衰竭', en: 'Terminal Acute Liver Failure' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '急性肝衰竭最重要的特征性表现是什么？',
      en: 'What is the most important characteristic manifestation of acute liver failure?'
    },
    options: {
      zh: ['肝性脑病和凝血障碍', '黄疸', '腹水', '转氨酶升高'],
      en: ['Hepatic encephalopathy and coagulopathy', 'Jaundice', 'Ascites', 'Elevated transaminases']
    },
    correctAnswer: 0,
    explanation: {
      zh: '急性肝衰竭特征是肝性脑病和凝血障碍（INR≥1.5），在无基础肝病的情况下急性发生。',
      en: 'Acute liver failure is characterized by hepatic encephalopathy and coagulopathy (INR ≥1.5), occurring acutely without underlying liver disease.'
    }
  },
  {
    id: 188,
    disease: { zh: '终末期横纹肌溶解症', en: 'Terminal Rhabdomyolysis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '横纹肌溶解症最危险的并发症是什么？',
      en: 'What is the most dangerous complication of rhabdomyolysis?'
    },
    options: {
      zh: ['急性肾衰竭', '心力衰竭', '肝衰竭', '肺栓塞'],
      en: ['Acute renal failure', 'Heart failure', 'Liver failure', 'Pulmonary embolism']
    },
    correctAnswer: 0,
    explanation: {
      zh: '横纹肌溶解释放大量肌红蛋白堵塞肾小管，导致急性肾衰竭，是最危险的并发症。',
      en: 'Rhabdomyolysis releases large amounts of myoglobin that block renal tubules, causing acute renal failure, the most dangerous complication.'
    }
  },
  {
    id: 189,
    disease: { zh: '终末期坏死性筋膜炎', en: 'Terminal Necrotizing Fasciitis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '坏死性筋膜炎最关键的治疗是什么？',
      en: 'What is the most critical treatment for necrotizing fasciitis?'
    },
    options: {
      zh: ['早期广泛外科清创', '抗生素治疗', '高压氧治疗', '伤口换药'],
      en: ['Early extensive surgical debridement', 'Antibiotic therapy', 'Hyperbaric oxygen therapy', 'Wound dressing changes']
    },
    correctAnswer: 0,
    explanation: {
      zh: '坏死性筋膜炎治疗关键是早期广泛外科清创，延迟手术显著增加死亡率。',
      en: 'The key treatment for necrotizing fasciitis is early extensive surgical debridement; delayed surgery significantly increases mortality.'
    }
  },
  {
    id: 190,
    disease: { zh: '终末期毒性休克综合征', en: 'Terminal Toxic Shock Syndrome' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '中毒性休克综合征最常见的致病菌是什么？',
      en: 'What is the most common causative organism of toxic shock syndrome?'
    },
    options: {
      zh: ['金黄色葡萄球菌', '链球菌', '大肠杆菌', '铜绿假单胞菌'],
      en: ['Staphylococcus aureus', 'Streptococcus', 'E. coli', 'Pseudomonas aeruginosa']
    },
    correctAnswer: 0,
    explanation: {
      zh: '金黄色葡萄球菌产生的TSST-1毒素是中毒性休克综合征最常见的病因。',
      en: 'TSST-1 toxin produced by Staphylococcus aureus is the most common cause of toxic shock syndrome.'
    }
  },
  {
    id: 191,
    disease: { zh: '终末期狂犬病', en: 'Terminal Rabies' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '狂犬病发病后的死亡率是多少？',
      en: 'What is the mortality rate after rabies onset?'
    },
    options: {
      zh: ['几乎100%', '约50%', '约30%', '约10%'],
      en: ['Nearly 100%', 'About 50%', 'About 30%', 'About 10%']
    },
    correctAnswer: 0,
    explanation: {
      zh: '狂犬病一旦发病，死亡率几乎100%，是目前已知死亡率最高的传染病。暴露后预防接种至关重要。',
      en: 'Once rabies develops, the mortality rate is nearly 100%, making it the deadliest known infectious disease. Post-exposure prophylaxis is crucial.'
    }
  },
  {
    id: 192,
    disease: { zh: '终末期埃博拉出血热', en: 'Terminal Ebola Hemorrhagic Fever' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '埃博拉病毒的主要传播途径是什么？',
      en: 'What is the main transmission route of Ebola virus?'
    },
    options: {
      zh: ['直接接触感染者的体液（血液、分泌物）', '空气传播', '消化道传播', '蚊虫传播'],
      en: ['Direct contact with infected body fluids (blood, secretions)', 'Airborne transmission', 'Digestive tract transmission', 'Insect vector transmission']
    },
    correctAnswer: 0,
    explanation: {
      zh: '埃博拉病毒通过直接接触感染者的血液、分泌物等体液传播，不通过空气传播。',
      en: 'Ebola virus spreads through direct contact with blood, secretions, and other body fluids of infected persons, not through air.'
    }
  },
  {
    id: 193,
    disease: { zh: '终末期朊蛋白病', en: 'Terminal Prion Disease' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '朊蛋白与传统病原体的最大区别是什么？',
      en: 'What is the biggest difference between prions and traditional pathogens?'
    },
    options: {
      zh: ['朊蛋白不含核酸，仅由蛋白质构成', '朊蛋白是DNA病毒', '朊蛋白是RNA病毒', '朊蛋白是细菌'],
      en: ['Prions contain no nucleic acid, composed only of protein', 'Prions are DNA viruses', 'Prions are RNA viruses', 'Prions are bacteria']
    },
    correctAnswer: 0,
    explanation: {
      zh: '朊蛋白（PrPSc）不含核酸，仅由异常折叠的蛋白质构成，能诱导正常蛋白错误折叠，对常规消毒和灭活方法高度耐受。',
      en: 'Prions (PrPSc) contain no nucleic acid, composed only of misfolded protein, able to induce normal protein misfolding, highly resistant to conventional disinfection and inactivation.'
    }
  },
  {
    id: 194,
    disease: { zh: '终末期恶性黑色素瘤脑转移', en: 'Terminal Melanoma with Brain Metastasis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'BRAF V600突变阳性黑色素瘤的靶向治疗药物是什么？',
      en: 'What are the targeted therapy drugs for BRAF V600 mutation-positive melanoma?'
    },
    options: {
      zh: ['BRAF抑制剂（维莫非尼）+ MEK抑制剂（考比替尼）', 'EGFR抑制剂', 'ALK抑制剂', 'VEGF抑制剂'],
      en: ['BRAF inhibitor (vemurafenib) + MEK inhibitor (cobimetinib)', 'EGFR inhibitor', 'ALK inhibitor', 'VEGF inhibitor']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'BRAF V600突变阳性黑色素瘤可使用BRAF抑制剂联合MEK抑制剂双靶向治疗。',
      en: 'BRAF V600 mutation-positive melanoma can be treated with dual targeted therapy using BRAF inhibitor combined with MEK inhibitor.'
    }
  },
  {
    id: 195,
    disease: { zh: '终末期卡波西肉瘤', en: 'Terminal Kaposi Sarcoma' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '卡波西肉瘤与哪种病毒密切相关？',
      en: 'Which virus is closely associated with Kaposi sarcoma?'
    },
    options: {
      zh: ['HHV-8（人类疱疹病毒8型/KSHV）', 'HPV', 'EBV', 'CMV'],
      en: ['HHV-8 (Human Herpesvirus 8/KSHV)', 'HPV', 'EBV', 'CMV']
    },
    correctAnswer: 0,
    explanation: {
      zh: '所有类型的卡波西肉瘤都与HHV-8（也称KSHV）感染密切相关。',
      en: 'All types of Kaposi sarcoma are closely associated with HHV-8 (also known as KSHV) infection.'
    }
  },
  {
    id: 196,
    disease: { zh: '终末期韦格纳肉芽肿', en: 'Terminal Wegener Granulomatosis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '肉芽肿性多血管炎（GPA/Wegener）的特征性抗体是什么？',
      en: 'What is the characteristic antibody for GPA (Wegener\'s granulomatosis)?'
    },
    options: {
      zh: ['c-ANCA（抗PR3抗体）', 'p-ANCA（抗MPO抗体）', '抗核抗体', '抗双链DNA抗体'],
      en: ['c-ANCA (anti-PR3 antibody)', 'p-ANCA (anti-MPO antibody)', 'Antinuclear antibody', 'Anti-dsDNA antibody']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'GPA（Wegener肉芽肿）的特征性抗体是c-ANCA（抗PR3抗体），阳性率约80-90%。',
      en: 'The characteristic antibody for GPA (Wegener\'s) is c-ANCA (anti-PR3 antibody), positive in about 80-90%.'
    }
  },
  {
    id: 197,
    disease: { zh: '终末期肺含铁血黄素沉着症', en: 'Terminal Pulmonary Hemosiderosis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'Goodpasture综合征（肺出血肾炎综合征）的特征性抗体是什么？',
      en: 'What is the characteristic antibody for Goodpasture syndrome?'
    },
    options: {
      zh: ['抗GBM抗体（抗肾小球基底膜抗体）', 'ANCA', '抗核抗体', '抗心磷脂抗体'],
      en: ['Anti-GBM antibody (anti-glomerular basement membrane antibody)', 'ANCA', 'Antinuclear antibody', 'Anti-cardiolipin antibody']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'Goodpasture综合征由抗GBM抗体引起，同时攻击肺泡和肾小球基底膜，导致肺出血和急进性肾炎。',
      en: 'Goodpasture syndrome is caused by anti-GBM antibodies that attack both alveolar and glomerular basement membranes, causing pulmonary hemorrhage and rapidly progressive glomerulonephritis.'
    }
  },
  {
    id: 198,
    disease: { zh: '终末期淀粉样变性', en: 'Terminal Amyloidosis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: 'AL型淀粉样变性的致病蛋白是什么？',
      en: 'What is the causative protein in AL amyloidosis?'
    },
    options: {
      zh: ['免疫球蛋白轻链', '转甲状腺素蛋白', '血清淀粉样蛋白A', 'β2微球蛋白'],
      en: ['Immunoglobulin light chains', 'Transthyretin', 'Serum amyloid A', 'Beta-2 microglobulin']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'AL型淀粉样变性由浆细胞异常产生的免疫球蛋白轻链沉积引起，是最常见的系统性淀粉样变性类型。',
      en: 'AL amyloidosis is caused by deposition of immunoglobulin light chains produced by abnormal plasma cells, the most common type of systemic amyloidosis.'
    }
  },
  {
    id: 199,
    disease: { zh: '终末期全身性肥大细胞增多症', en: 'Terminal Systemic Mastocytosis' },
    treatmentDays: 365,
    category: 'fatal',
    question: {
      zh: '系统性肥大细胞增多症最常见的基因突变是什么？',
      en: 'What is the most common gene mutation in systemic mastocytosis?'
    },
    options: {
      zh: ['KIT D816V突变', 'JAK2 V617F', 'BCR-ABL', 'FLT3-ITD'],
      en: ['KIT D816V mutation', 'JAK2 V617F', 'BCR-ABL', 'FLT3-ITD']
    },
    correctAnswer: 0,
    explanation: {
      zh: 'KIT D816V突变见于90%以上的系统性肥大细胞增多症患者，是重要的诊断标志物和治疗靶点。',
      en: 'KIT D816V mutation is found in over 90% of systemic mastocytosis patients, serving as an important diagnostic marker and therapeutic target.'
    }
  }
];
