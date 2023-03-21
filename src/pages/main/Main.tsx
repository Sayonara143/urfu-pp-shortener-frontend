import React, { useEffect, useState } from 'react';
import classes from './Main.module.scss';

import { Calendar } from 'primereact/calendar';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

import * as ShortenerService from '../../services/shortener.service';
import { toast } from 'react-toastify';

interface IStateStat {
  isloading: boolean,
  stat: null | Stat,
}

type Stat =  {
  shortUrl: string,
  longUrl: string,
  populariity: number
}
const Main = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [shortLink, setShortLink] = useState({
    isloading: false,
    shortLink: null,
  });
  const [stat, setStat] = useState<IStateStat>({
    isloading: false,
    stat: null,
  });
  const [expireAt, setExpireAt] = useState<number | undefined>();
  const [dateTime24h, setDateTime24h] = useState<null | string | Date | Date[]>();

  useEffect(() => {
    if (!dateTime24h) return;
    setExpireAt(Date.now() - +dateTime24h.valueOf());
  }, [dateTime24h]);

  const createLink = async () => {
    
    setShortLink({
      isloading: true,
      shortLink: null,
    });

    await ShortenerService.createShortLink({
      longUrl,
      expireAt,
    })
      .then((response) => response.json())
      .then((response) => {
        
        if (response.success) {
          setShortLink({
            isloading: false,
            shortLink: response?.data?.shortUrl || null,
          })
          return
        }
        toast.error('Ошибка создания')
      })
      .catch((err) => err)
      .finally(() => {
        setShortLink(prev => ({
          ...prev,
          isloading: false,
        }));
      })
  };

  const getStat = async () => {
    
    setStat({
      isloading: true,
      stat: null,
    });

    await ShortenerService.getStat({
      shortUrl
    })
      .then((response) => response.json())
      .then((response) => {
        
        if (response.success) {
          console.log(response)
          setStat({
            isloading: false,
            stat: response?.data || null,
          })
          return
        }
        toast.error('Ошибка получения')
      })
      .catch((err) => err)
      .finally(() => {
        setStat(prev => ({
          ...prev,
          isloading: false,
        }));
      })
  };

  return (
    <div className={classes.container}>

        <TabView>
          <TabPanel header='Создание ссылки'> 
            <div className={classes.wrapper}>
              <div className={classes.form}>
                <div className={classes.block}>
                  <InputText
                    style={{'width': '100%'}}
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    placeholder='Введите длинную ссылку'
                  />
                </div>
                <div className={classes.block}>
                  <h6>Дата окончания действия ссылки (по умолчанию - вечна)</h6>
                  <Calendar
                    placeholder='Дата окончания'
                    style={{'width': '100%', 'marginTop': '10px'}}
                    value={dateTime24h}
                    onChange={(e) => setDateTime24h(e.value)}
                    showTime
                    hourFormat='24'
                    locale='ru'
                  />
                </div>
                <div className={classes.block}>
                  <Button
                    style={{'width': '100%'}}
                    label='Создать'
                    icon='pi pi-check'
                    loading={shortLink.isloading}
                    onClick={createLink}
                  />
                </div>
              </div>
              {shortLink.shortLink && (
                <div>
                  <span>
                    Ваша ссылка: <span>{shortLink.shortLink}</span>
                  </span>
                </div>
              )}
            </div>
          </TabPanel>
          <TabPanel header='Статистика'>
          <div className={classes.wrapper}>
              <div className={classes.form}>
                <div className={classes.block}>
                  <InputText
                    style={{'width': '100%'}}
                    value={shortUrl}
                    onChange={(e) => setShortUrl(e.target.value)}
                    placeholder='Введите короткую ссылку'
                  />
                </div>
                <div className={classes.block}>
                  <Button
                    style={{'width': '100%'}}
                    label='Получить статистику'
                    icon='pi pi-check'
                    loading={stat.isloading}
                    onClick={getStat}
                  />
                </div>
              </div>
              {stat.stat && (
                <div className={classes.stat}>
                  <span>
                    Длинная ссылка: <span>{stat.stat.shortUrl}</span>
                  </span>
                  <span>
                    Короткая ссылка: <span>{stat.stat.longUrl}</span>
                  </span>
                  <span>
                    Кол-во переходов: <span>{stat.stat.populariity}</span>
                  </span>
                </div>
              )}
            </div>
          </TabPanel>
        </TabView>
    </div>
  );
};

export default Main;
