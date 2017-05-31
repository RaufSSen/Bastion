/**
 * @file deleteRole command
 * @author Sankarsan Kampa (a.k.a k3rn31p4nic)
 * @license MIT
 */

exports.run = (Bastion, message, args) => {
  if (!message.member.hasPermission(this.help.userPermission)) return Bastion.log.info('User doesn\'t have permission to use this command.');
  if (!message.guild.me.hasPermission(this.help.botPermission)) {
    return message.channel.send({
      embed: {
        color: Bastion.colors.red,
        description: `I need **${this.help.botPermission}** permission to use this command.`
      }
    }).catch(e => {
      Bastion.log.error(e.stack);
    });
  }

  if (!args.mention && !args.id && !args.name) {
    return message.channel.send({
      embed: {
        color: Bastion.colors.yellow,
        title: 'Usage',
        description: `\`${Bastion.config.prefix}${this.help.usage}\``
      }
    }).catch(e => {
      Bastion.log.error(e.stack);
    });
  }

  let role = message.mentions.roles.first();
  if (!role) {
    if (args.id) {
      role = message.guild.roles.get(args.id);
    }
    else if (args.name) {
      role = message.guild.roles.find('name', args.name.join(' '));
    }
  }

  if (role && message.author.id !== message.guild.ownerID && message.member.highestRole.comparePositionTo(role) <= 0) return Bastion.log.info('User doesn\'t have permission to use this command on that role.');
  else if (!role) {
    return message.channel.send({
      embed: {
        color: Bastion.colors.red,
        description: 'No role found for the given parameter.'
      }
    }).catch(e => {
      Bastion.log.error(e.stack);
    });
  }

  role.delete().then(r => {
    message.channel.send({
      embed: {
        color: Bastion.colors.red,
        title: 'Role Deleted',
        fields: [
          {
            name: 'Role Name',
            value: r.name,
            inline: true
          },
          {
            name: 'Role ID',
            value: r.id,
            inline: true
          }
        ]
      }
    }).catch(e => {
      Bastion.log.error(e.stack);
    });
  }).catch(e => {
    Bastion.log.error(e.stack);
  });
};

exports.config = {
  aliases: [ 'dr' ],
  enabled: true,
  argsDefinitions: [
    { name: 'mention', type: String, alias: 'm', multiple: true, defaultOption: true },
    { name: 'id', type: String, alias: 'i' },
    { name: 'name', type: String, alias: 'n', multiple: true }
  ]
};

exports.help = {
  name: 'deleterole',
  description: 'Deletes a role either by role mention (default), id or name.',
  botPermission: 'MANAGE_ROLES',
  userPermission: 'MANAGE_ROLES',
  usage: 'deleteRole < [-m] @Role Mention | -i ROLE_ID | -n Role Name >',
  example: [ 'deleteRole -m @Server Staffs', 'deleteRole -i 295982817647788032', 'deleteRole -n Server Staffs' ]
};
