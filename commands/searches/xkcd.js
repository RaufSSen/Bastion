/**
 * @file xkcd command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license GPL-3.0
 */

const xkcd = xrequire('xkcd');

exports.exec = async (Bastion, message, args) => {
  if (args.latest) {
    await xkcd((data) => {
      message.channel.send({
        embed: {
          color: Bastion.colors.BLUE,
          title: data.title,
          description: data.alt,
          url: `https://xkcd.com/${data.num}`,
          fields: [
            {
              name: 'Comic Number',
              value: data.num,
              inline: true
            },
            {
              name: 'Publication Date',
              value: new Date(data.year, data.month, data.day).toDateString(),
              inline: true
            }
          ],
          image: {
            url: data.img
          },
          footer: {
            text: 'Powered by xkcd'
          }
        }
      }).catch(e => {
        Bastion.log.error(e);
      });
    });
  }
  else {
    await xkcd((data) => {
      let comicNumber;
      if (args.number && !isNaN(args.number)) {
        comicNumber = args.number > data.num ? data.num : args.number;
      }
      else {
        comicNumber = Bastion.methods.getRandomInt(1, data.num);
        comicNumber = Number.random(1, data.num);
      }

      xkcd(comicNumber, (data) => {
        message.channel.send({
          embed: {
            color: Bastion.colors.BLUE,
            title: data.title,
            description: data.alt,
            url: `https://xkcd.com/${data.num}`,
            fields: [
              {
                name: 'Comic Number',
                value: data.num,
                inline: true
              },
              {
                name: 'Publication Date',
                value: new Date(data.year, data.month, data.day).toDateString(),
                inline: true
              }
            ],
            image: {
              url: data.img
            },
            footer: {
              text: 'Powered by xkcd'
            }
          }
        }).catch(e => {
          Bastion.log.error(e);
        });
      });
    });
  }
};

exports.config = {
  aliases: [],
  enabled: true,
  argsDefinitions: [
    { name: 'number', type: Number, alias: 'n' },
    { name: 'latest', type: Boolean, alias: 'l' }
  ]
};

exports.help = {
  name: 'xkcd',
  description: 'Shows a xkcd comic.',
  botPermission: '',
  userTextPermission: '',
  userVoicePermission: '',
  usage: 'xkcd [ --latest | -n comic_number ]',
  example: [ 'xkcd', 'xkcd --latest', 'xkcd -n 834' ]
};
