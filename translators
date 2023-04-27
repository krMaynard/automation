import pandas as pd
import translators as ts

#@title Input fields

q_text = '\u5E7B\u306E\u4E2D\u7DE8\u300C\u8857\u3068\u3001\u305D\u306E\u4E0D\u78BA\u304B\u306A\u58C1\u300D\u3092\u5143\u306B\u3057\u305F\u4F5C\u54C1\u3067\u306F\u306A\u3044\u304B\u3068\u3044\u3046\u3053\u3068\u3060' #@param {type:"string"}
source_language = 'auto' #@param ["auto", "ti", "ja", "ko", "zh"] {allow-input: true}
target_language = 'en' #@param ["en", "ti", "ja", "ko", "zh"] {allow-input: true}
#text_and_dropdown = '2nd option' #@param ["1st option", "2nd option", "3rd option"] {allow-input: true}

print("You entered: ",q_text)


#Defines translation function using Translators package.

def translate_text(translator_names,source_language,target_language,q_text):
  
  print ('\nAttempting %s > %s translation with %d engines.\n' % (source_language, target_language,len(translator_names)))
  
  i=0
  failed_list=[]
  for _translator in translator_names:
    try:
      i+=1
      """if _translator == 'baidu':
        if target_language == 'ja':
          translation = ts.translate_text(q_text,translator=_translator, from_language=source_language,to_language='jp')
        if target_language == 'ko':
          translation = ts.translate_text(q_text,translator=_translator, from_language=source_language,to_language='kor')
      else:"""
      translation = ts.translate_text(q_text,translator=_translator, from_language=source_language,to_language=target_language)
      if translation=='':
        failed_list.append(_translator)
        print("%d %s failed to provide a translation." % (i,_translator))
      else:
        print("%d %s:\t%s\n" % (i,_translator,translation))
        success_list.append(_translator)
        #if source_language != 'auto':
        source_lang_list.append(source_language)
        query_list.append(q_text)
        target_lang_list.append(target_language)  
        translation_list.append(translation)
    except Exception as e:
      failed_list.append(_translator)
      print("%d %s failed to connect. Exception: %s\n" % (i,_translator,e))

  #print('\nConnected with %d of %d engines.' % (i,len(translator_names)))
  if len(failed_list)>0:
    print('Failed to connect with %d engines: ' % len(failed_list),failed_list,'\n','—'*40)

success_list,translation_list=[],[]
source_lang_list=[]
target_lang_list,query_list=[],[]
tdict = {
    "Translator": success_list,
    "Source Language": source_lang_list,
    "Query": query_list,
    "Target Language": target_lang_list,
    "Translation": translation_list
}

for x in target_lang_list:
  translate_text(ts.translators_pool[0:],source_language,x,q_text)
df=pd.DataFrame.from_dict(tdict)
df.to_csv(r'translation.csv',index=False)
df.tail()
