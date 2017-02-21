--------------------------------------------------------
--  DDL for Package Body AX_PLG_SPINKIT_PKG
--------------------------------------------------------

  CREATE OR REPLACE PACKAGE BODY "AX_PLG_SPINKIT_PKG" as

    gv_playground_host varchar2(100) := 'PLAYGROUND';

    function f_is_playground return boolean is
    v_ax_workspace varchar2(200);
    begin
        select apex_util.find_workspace((select apex_application.get_security_group_id from dual))
          into v_ax_workspace
          from dual;

        if  gv_playground_host = v_ax_workspace then
            return true;
        else
            return false;
        end if;
    end f_is_playground;

    function is_numeric(p_value varchar2) return number is
        v_new_num number;
    begin
        v_new_num := to_number(p_value);
        return 1;
    exception
    when others then
        return 0;
    end is_numeric;



    function spinkit (
        p_dynamic_action      in apex_plugin.t_dynamic_action,
        p_plugin              in apex_plugin.t_plugin
    ) return apex_plugin.t_dynamic_action_render_result is
     --
     v_result          apex_plugin.t_dynamic_action_render_result;
     v_exe_code        clob;
     v_aff_element     varchar2(200);
     v_spinner_class   p_dynamic_action.attribute_01%type := p_dynamic_action.attribute_01;
    begin

       if apex_application.g_debug then
          apex_plugin_util.debug_dynamic_action(
            p_plugin                => p_plugin,
            p_dynamic_action        => p_dynamic_action
          );
       end if;

       select decode(da.affected_elements_type_code,
                     'JQUERY_SELECTOR',
                     da.affected_elements,
                     nvl(reg.static_id,'R' || da.affected_region_id)) as affected_element
         into v_aff_element
         from apex_application_page_da_acts da
    left join apex_application_page_regions reg on (reg.region_id = da.affected_region_id)
        where da.action_id =  p_dynamic_action.id;

       if f_is_playground = false then
           apex_css.add_file (
                        p_name      => 'spinkit',
                        p_directory => p_plugin.file_prefix );

           apex_javascript.add_library(p_name           => 'spinkit.spinner',
                                       p_directory      =>  p_plugin.file_prefix,
                                       p_version        => NULL,
                                       p_skip_extension => FALSE);
           apex_css.add_file (
                        p_name      => 'spinkit.spinner',
                        p_directory => p_plugin.file_prefix );
       end if;

       v_exe_code := ' new apex.plugins.spinKit({'      ||
            'parent           :"'  || v_aff_element     || '",' ||
            'spinnerClass     :"'  || v_spinner_class   || '",' ||
       ' });';

        apex_javascript.add_onload_code(
          p_code => v_exe_code
       );

       v_result.javascript_function := 'null';

       return v_result;

    end spinkit;

end ax_plg_spinkit_pkg;

/
