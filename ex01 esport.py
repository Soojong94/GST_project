#!/usr/bin/env python
# coding: utf-8

# In[39]:


import requests as req


# In[40]:


url = 'https://game.naver.com/esports/League_of_Legends/schedule/lck'
res = req.get(url)


# In[41]:


res.text


# In[42]:


from bs4 import BeautifulSoup as bs


# In[43]:


soup = bs(res.text,'lxml')


# In[44]:


soup.select('a')


# In[76]:


data = soup.select('h2.blind')


# In[77]:


data[0].text


# In[78]:


data = list('h2')


# In[79]:


esport_title = soup.select('a.esport_tit')
for i in range(len(esport_title)):
    print(esport_title[i].text)


# In[80]:


for i in range(len(data)):
    print(data[i])


# In[81]:


esport_title = soup.select('a.esport_tit')
for i in range(len(esport_title)):
    print(esport_title[i].text)


# In[82]:


for i in esport_title :
    print(i.text)


# In[83]:


res1 = req.get('https://game.naver.com/esports/League_of_Legends/schedule/lck')


# In[84]:


res1.text


# In[85]:


soup = bs(res1.text,'lxml')


# In[86]:


tem = soup.select('div')


# In[87]:


tem[0].text


# In[88]:


ex = soup.select_one('span')
ex


# In[89]:


ex.text


# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:





# In[ ]:




